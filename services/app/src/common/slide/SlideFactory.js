import ReactDOMServer from 'react-dom/server';
import { emptyParagraph, RemixEngine, skipEmptyParagraphs } from "../remix/RemixEngine";
import { Markup } from "../model/Markup";
import { MarkupContainer } from "../model/MarkupContainer";
import { Slide } from "./Slide";
import { toHtml } from "./transforms/toHtml";
import { ProgressTracker } from "../util/ProgressTracker";
import { logger } from "../util/logger";
import { chooseRemix } from "./transforms";
import { hasActivePrompt } from "../../modules/composer/components/DeckEditor/modules/prompt/transforms/hasActivePrompt";
import { PromptSession } from "../../modules/composer/components/DeckEditor/modules/prompt/PromptSession";
import ComponentService from "../api/plugins/ComponentService";
import { SLIDE } from "../../modules/composer/components/DeckEditor/modules/plugins/component/slide/type";
import { GROUP_COLLECTION } from "../../modules/composer/components/DeckEditor/modules/plugins/component/groups/type";
import { GROUP } from "../../modules/composer/components/DeckEditor/modules/plugins/component/groups/components/group/type";

const { instance: remixEngine } = RemixEngine;

const nodeToMarkup = (
  deckId,
  containerNode,
  containerPath,
  capabilityService,
  view,
  themeName,
  settingsForSlide,
  slideMonitor,
  promptSession
) => {

  const markup = [];
  for (let j = 0; j < containerNode.children.length; j++) {
    const componentNode = containerNode.children[j];
    const componentPath = containerPath ? containerPath.concat(j) : undefined;

    let plugin;
    if ((plugin = capabilityService.get(componentNode.type)) !== undefined && plugin.slideComponent) {

      // Adding a block for a particular capability to the slide.
      const SlideComponentClass = plugin.slideComponent;
      if (SlideComponentClass) {
        const slideElement = new SlideComponentClass({
          node: componentNode,
          view,
          themeName,
          slideSettings: settingsForSlide,
          monitor: slideMonitor,
          deckId,
        });
        const { html } = slideElement;
        const markupType = slideElement.markupType !== undefined ? slideElement.markupType : componentNode.type;
        if (html !== undefined) {
          if (Array.isArray(html)) {
            html.forEach((htmlElement) => {
              markup.push(new Markup(markupType, componentNode, componentPath, { html: ReactDOMServer.renderToStaticMarkup(htmlElement) }));
            });
          } else {
            markup.push(new Markup(markupType, componentNode, componentPath, { html: ReactDOMServer.renderToStaticMarkup(html) }));
          }

        } else if (slideElement.component !== undefined) {
          markup.push(new Markup(markupType, componentNode, componentPath, { component: slideElement.component }, Markup.Renderer.REACT));
        }
      } else {
        const html = toHtml(componentNode);
        markup.push(new Markup(componentNode.type, componentNode, componentPath, { html }));
      }

    } else if (componentNode.type === GROUP_COLLECTION || componentNode.type === GROUP) {
      markup.push(new MarkupContainer(
        componentNode.type,
        componentNode,
        componentPath,
        nodeToMarkup(
          deckId,
          componentNode,
          componentPath,
          capabilityService,
          view,
          themeName,
          settingsForSlide,
          slideMonitor,
          promptSession
        )
      ));
    } else if (!hasActivePrompt(componentNode, componentPath, promptSession)) { // Don't render elements that are being configured.
      const html = toHtml(componentNode);
      markup.push(new Markup(componentNode.type, componentNode, componentPath, { html }));
    }
  }
  return markup;
};

/**
 * Generate a single slide from a node, found at a given path in the editor tree.
 *
 * @returns {Slide}
 */
export const generateSlide = (slideNode, deckId, slidePath, view, themeName, monitor = ProgressTracker.DUMMY, setFirstReady) => {
  if (deckId === undefined) {
    logger.warn(`Missing deck ID when generating slides`);
  }
  const t0 = new Date().getTime();
  let first = true;
  const promptSession = PromptSession.instance;
  if (slideNode && slideNode.id !== undefined && slideNode.type === SLIDE) {
    const slideReady = monitor.watch(slideNode.id, first && setFirstReady ? () => setFirstReady(true) : undefined);
    first = false;
    const slideMonitor = new ProgressTracker(() => {
      if (slideReady !== undefined) {
        slideReady();
      }
    });

    // We do not know for sure whether there is a settings object for this slide.
    const settingsForSlide = slideNode.settings ? { ...slideNode.settings } : {};

    //
    // Process all slides.
    //
    const slide = new Slide(slideNode.id, settingsForSlide, slidePath, undefined);
    const capabilityService = ComponentService.instance();
    const markup = nodeToMarkup(deckId, slideNode, slidePath, capabilityService, view, themeName, settingsForSlide, slideMonitor, promptSession)
      .filter((node) => !emptyParagraph(node));
    const t1 = new Date().getTime();
    slide.matchingRemixes = remixEngine.matches(markup);
    const t2 = new Date().getTime();
    const remixName = chooseRemix(slide);
    slide.markup = remixEngine.compileMarkup(markup, remixName);
    const t3 = new Date().getTime();
    if (view === Slide.View.LIGHTBOX) {
      slide.node = slideNode; // TODO we should get rid of this and instead have a path reference only
      slide.sourceMarkup = markup; // for reorganising the markup
    }

    if (slideMonitor.ready()) {
      if (slideReady !== undefined) {
        slideReady();
      }
    }
    const t4 = new Date().getTime();
    if (logger._level === 'trace') {
      logger.trace(`Generating a single slide took ${t4 - t0} ms:`);
      logger.trace(`\t- Generating markup took ${t1 - t0} ms`);
      logger.trace(`\t- Finding matching remixes took ${t2 - t1} ms`);
      logger.trace(`\t- Compiling markup took ${t3 - t2} ms`);
      logger.trace(`\t- Marking as ready took ${t4 - t3} ms`);
    }
    return slide;
  }
  return new Slide();
};

/**
 * Reorganise (cluster, transform) the slide's markup.
 *
 * @param slide
 */
export const compileSlideMarkup = (slide) => {
  if (slide.sourceMarkup && slide.sourceMarkup.length > 0) {
    slide.markup = remixEngine.compileMarkup(slide.sourceMarkup, slide.remix);
  }
};

/**
 * Generate slides from an array of content nodes.
 */
export const generateSlides = (content, deckId, view, themeName, monitor, setFirstReady) => {
  const slides = [];

  const topLevelNodes = content !== undefined ? Array.from(content) : [];

  for (let i = 0; i < topLevelNodes.length; i++) {
    const node = topLevelNodes[i];
    if (node.type === SLIDE) {
      if (node.id !== undefined) {
        const path = [i];

        slides.push(generateSlide(node, deckId, path, view, themeName, monitor, setFirstReady));
      } else {
        logger.warn(`Encountered a slide element without an ID at the top level of the editor. This should never happen.`);
      }

    } else {
      logger.warn(`Encountered an element of type ${node.type} at the top level of the editor. This should never happen.`);
    }
  }

  return slides;
};

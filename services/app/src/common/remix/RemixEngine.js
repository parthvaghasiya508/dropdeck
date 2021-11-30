import { Node } from "slate";
import { chooseRemix } from "../slide/transforms/chooseRemix";
import { getPaletteKeyForSlide } from "../slide/transforms/getPaletteKeyForSlide";
import { getColorChartForSlide } from "../slide/transforms/palette/getColorChartForSlide";
import { logger } from "../util/logger";
import { applyClustering, applySequencing } from "../slide/transforms/clustering/clustering";
import { TYPE_NODE } from "../slide/transforms/clustering/Types";
import { HEADING_ONE } from "../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

const singleton = Symbol('Remix engine singleton pointer');
const singletonEnforcer = Symbol('Remix engine singleton enforcer');

export const emptyParagraph = (markup) => (
  ((markup.type === PARAGRAPH || markup.type === HEADING_ONE || markup.type === HEADING_TWO) &&
    markup.content !== undefined && Node.string(markup.content).length === 0)
);

export const skipEmptyParagraphs = (tree) => tree.kind === TYPE_NODE && emptyParagraph(tree.node);

export class RemixEngine {

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct Singleton');
    }

    this.init();
  }

  /**
  * Transform + cluster the slide's markup.
  */
  compileMarkup = (markup, remixName, defaultClusteredMarkup, defaultNonClusteredMarkup) => {
    const remix = remixName ? this.get(remixName) : null;
    if (remix !== null) {
      if (remix.transform) {
        return remix.transform(markup);
      }
      if (!remix.clustering) {
        return defaultNonClusteredMarkup || applySequencing(markup, skipEmptyParagraphs);
      }
    }
    return defaultClusteredMarkup || applyClustering(markup, skipEmptyParagraphs);
  };

  init = () => {
    this._registry = {};
    this._fallbacks = {};
  };

  get = (name) => this._registry[name] || this._fallbacks[name];

  register = (remix, fallback = false) => {
    if (Array.isArray(remix.rule)) {
      logger.warn(`Remix ${remix.name()} has multiple rules`);
    }
    const store = fallback ? this._fallbacks : this._registry;
    if (store[remix.name()]) {
      throw new Error(`Remix with name ${remix.name()} already exists`);
    }
    store[remix.name()] = remix;
    return this[singleton];
  };

  matches = (content, featuredOnly = false) => {
    const defaultClusteredMarkup = applyClustering(content, skipEmptyParagraphs);
    const defaultNonClusteredMarkup = applySequencing(content, skipEmptyParagraphs);
    const t0 = new Date().getTime();

    // Only match against non-deprecated remixes.
    let remixes = Object.values(this._registry).filter((remix) => !remix.deprecated);

    if (featuredOnly) {
      remixes = remixes.filter((remix) => remix.featured);
    }
    const candidates = [];
    for (let i = 0; i < remixes.length; i++) {
      let remix = remixes[i];
      let evaluating = true;
      do {
        const transformed = this.compileMarkup(content, remix.name(), defaultClusteredMarkup, defaultNonClusteredMarkup);
        const score = remix.score(transformed);
        if (score > 0) {
          candidates.push({
            name: remix.name(),
            remix,
            score
          });
          evaluating = false;
        } else if (remix.next()) {
          // If the current remix offers a fallback, we continue down the chain:
          logger.trace(`Remix ${remix.name()} offers a fallback ${remix.next().name()} - continuing remix evaluation`);
          remix = remix.next();
          evaluating = remix !== undefined;
        } else {
          evaluating = false;
        }
      } while (evaluating);
    }
    const result = candidates.sort((a, b) => b.score - a.score);
    const t1 = new Date().getTime();
    logger.trace(`Matching remixes with slide took ${t1 - t0} ms`);
    return result;
  };

  css = (slides, animate, themeName) => {
    const payload = {};
    const root = {};
    if (animate) {
      payload["@keyframes move"] = {
        "0%": {
          "webkit-transform-origin": "bottom left",
          "moz-transform-origin": "bottom left",
          "ms-transform-origin": "bottom left",
          "o-transform-origin": "bottom left",
          transformOrigin: "bottom left",
          transform: "scale(1.0)",
          "ms-transform": "scale(1.0)",
          "webkit-transform": "scale(1.0)",
          "o-transform": "scale(1.0)",
          "moz-transform": "scale(1.0)",
        },
        "50%": {
          transform: "scale(1.15)",
          "ms-transform": "scale(1.15)",
          "webkit-transform": "scale(1.15)",
          "o-transform": "scale(1.15)",
          "moz-transform": "scale(1.15)",
        },
        "100%": {
          "webkit-transform-origin": "bottom left",
          "moz-transform-origin": "bottom left",
          "ms-transform-origin": "bottom left",
          "o-transform-origin": "bottom left",
          transformOrigin: "bottom left",
          transform: "scale(1.0)",
          "ms-transform": "scale(1.0)",
          "webkit-transform": "scale(1.0)",
          "o-transform": "scale(1.0)",
          "moz-transform": "scale(1.0)",
        }
      };
    }

    if (!Array.isArray(slides)) {
      slides = [slides];
    }

    if (slides) {
      slides.forEach((slide) => {
        const remixName = chooseRemix(slide);
        if (remixName) {
          const remixClass = this.get(remixName);
          if (remixClass !== undefined) {
            const paletteOverrideKey = getPaletteKeyForSlide(remixClass, themeName, slide);
            const key = paletteOverrideKey.length > 0 ? `& ${paletteOverrideKey} .slide.${remixName}` : `& .slide.${remixName}`;
            if (root[key] === undefined) {
              const colorChart = getColorChartForSlide(themeName, slide.settings, remixName);
              root[key] = remixClass.css(colorChart);
              if (animate) {
                root[`& .swiper-slide-active .slide.${remixName}`] = remixClass.animation();
              }
            }
          }
        }
      });
    }
    payload.remixStyles = root;
    return payload;
  };

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new RemixEngine(singletonEnforcer);
    }

    return this[singleton];
  }
}

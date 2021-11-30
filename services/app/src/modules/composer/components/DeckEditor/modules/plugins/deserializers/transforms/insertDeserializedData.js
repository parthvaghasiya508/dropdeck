import { Editor, Range, Transforms } from "slate";
import { SelectionTransforms } from "../../../../services/transforms/SelectionTransforms";
import { normalize } from "./normalize";
import { filterEmptyNodes } from "./filterEmptyNodes";
import { splitIntoSlides } from "./splitIntoSlides";
import { COMPONENT_IN_SLIDE_DEPTH, SlideTransforms } from "../../../../services/transforms/SlideTransforms";
import { padFragment } from "./padFragment";
import { logger } from "../../../../../../../../common/util/logger";
import { fromSlateFragment } from "./fromSlateFragment";
import { parseSlateFragment } from "../html/transforms/parseSlateFragment";
import { EditorTransforms } from "../../../../services/transforms/EditorTransforms";
import { PARAGRAPH } from "../../component/paragraph/type";
import { hasActivePrompt } from "../../../prompt/transforms/hasActivePrompt";

const insertSlides = (editor, slides, targetPath, fromEditor) => {
  Editor.withoutNormalizing(editor, () => {

    // If we only have a single slide OR the target slide is empty OR we have multiple slides but not Dropdeck content,
    // then we paste that into the current slide.
    const [currentSlide, currentSlidePath] = SlideTransforms.currentSlide(editor);
    let slidesToAdd = slides;
    const isTargetSlideEmpty = SlideTransforms.isSlideEmpty(editor, currentSlide);
    const singleSlide = slides.length === 1;
    if (singleSlide || isTargetSlideEmpty || !fromEditor) {
      slidesToAdd = slides.slice(1); // remaining slides to insert
      const firstSlide = slides[0];
      const content = firstSlide.children;
      if (content.length > 0) {

        const extendedContent = padFragment(content);

        // In this case we insert the contents of the slide into the
        // target slide, not modifying slide settings.
        if (singleSlide) {

          const firstNodeType = extendedContent[0].type;

          // replace the selected node type by the first block type
          if (firstNodeType && firstNodeType !== PARAGRAPH && !Editor.isVoid(editor, extendedContent[0])) {
            Transforms.setNodes(editor, { type: firstNodeType });
          }

          Transforms.insertFragment(editor, extendedContent);
          return;
        }

        const { settings } = firstSlide;

        // If the target element is an empty paragraph then we delete it.
        const currentElement = EditorTransforms.activeElementNode(editor);
        let deleteTargetNode = false;
        if (currentElement !== undefined && EditorTransforms.isTextNode(currentElement) && EditorTransforms.isNodeEmpty(editor, currentElement)) {
          deleteTargetNode = true;
        }

        // retain existing slide settings
        if (settings && Object.keys(settings).length) {
          editor.settings(currentSlidePath).setAll(settings);
        }
        Transforms.insertNodes(editor, extendedContent);

        // Delete the target (empty) node after pasting.
        if (deleteTargetNode) {
          Transforms.removeNodes(editor, { at: targetPath });
          const at = EditorTransforms.lastLocation(editor, currentSlidePath);
          if (at) {
            Transforms.select(editor, at);
          }
        }
      }
    }

    // We have multiple slides and will insert them one by one.
    if (slides.length > 1) {
      let at = editor.selection;
      if (Range.isRange(at)) {
        at = at.anchor;
      }
      // Transforms.insertNodes(editor, slidesWithBreaks, { at: Path.parent(targetPath), voids: true, select: true });
      for (let i = slidesToAdd.length - 1; i >= 0; i--) {
        const slide = slidesToAdd[i];
        if (slide && slide.children) {
          editor.splitSlide({
            at,
            content: slide.children,
            settings: slide.settings
          });
        }
      }

      // Update the selection: cursor should be at the end of the newly inserted slide set.
      const lastSlide = slides[slides.length - 1];
      const lastElementIndex = lastSlide.children.length - 1;
      const lastElement = lastSlide.children[lastElementIndex];
      const { path, offset } = SelectionTransforms.endOf(editor, lastElement);
      const newSelection = {
        path: [targetPath[0] + slidesToAdd.length, lastElementIndex, ...path],
        offset,
      };
      Transforms.select(editor, newSelection);
    }
  });
};
/**
 * Deserialize rich data into slides and insert into the editor.
 *
 * @param deserialize
 * @param parseBody
 * @returns {function(...[*]=)}
 */
export const insertDeserializedData = ({ deserialize, parseBody, split = true }) => (editor, insertData) => (data) => {

  const [targetNode, targetPath] = SelectionTransforms.componentElement(editor);

  // If active prompt session then we just insert plain text.
  const { promptSession } = editor;
  if (promptSession && promptSession !== null) {
    if (hasActivePrompt(targetNode, targetPath, promptSession)) {
      logger.debug(`Active prompt session - don't parse clipboard`);
      insertData(data);
      return;
    }
  }

  // We currently only handle data fragments at the top of a slide.
  // Further work needed to process and relativise data inserted into nested elements.
  if (targetPath.length !== COMPONENT_IN_SLIDE_DEPTH) {
    logger.trace(`Inserting data at a nested path at level ${targetPath.length} - skipping HTML deserialisation`);
    insertData(data);
    return;
  }

  // If we find an encoded Slate fragment attribute we use that as our slide listing.
  const slateFragment = parseSlateFragment(data);
  if (slateFragment) {
    const slidesFromFragment = fromSlateFragment(slateFragment);
    const slides = splitIntoSlides(slidesFromFragment, false);
    logger.debug(`Got JSON fragment from data-slate-fragment`);
    if (slides.length > 0) {
      insertSlides(editor, slides, targetPath, true);
    }
    return;
  }

  // Otherwise we parse the HTML fragment.
  const { body, fromEditor } = parseBody(data);
  if (body) {
    if (!targetNode || !targetPath) {
      logger.error("Invalid paste target");
      return;
    }
    const fragment = normalize(editor, filterEmptyNodes(editor, deserialize(body, targetNode, targetPath)));
    if (!fragment.length) return;

    if (targetPath.length === COMPONENT_IN_SLIDE_DEPTH) { // redundant check, but keep it in as we want to handle nested elements eventually
      const slides = splitIntoSlides(fragment, !fromEditor && split);
      if (slides.length > 0) {
        insertSlides(editor, slides, targetPath, fromEditor);
      }
      return;
    }

    // Deep nesting - TODO
    return;
  }

  insertData(data);
};

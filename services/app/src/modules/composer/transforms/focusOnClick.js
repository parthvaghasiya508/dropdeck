import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { logger } from "../../../common/util/logger";
import { SelectionTransforms } from "../components/DeckEditor/services/transforms/SelectionTransforms";

const select = (editor, path, setHighlighted) => {
  try {
    if (path) {
      const location = SelectionTransforms.lastLocation(editor, path);
      if (location) {
        Transforms.select(editor, location);
        ReactEditor.focus(editor);
        setHighlighted(path);
        return;
      }
    }
    Transforms.select(editor, path);
    ReactEditor.focus(editor);
    setHighlighted(path);
  } catch (e) {
    logger.error(e);
  }
};

/**
 * Focus on the node at the given path in the editor.
 */
export const focusOnClick = (editor, setHighlighted) => (slideIndex) => (path, sequence) => (evt) => {

  if (path && Array.isArray(path) && path.length > 1) {

    // Ensure that the path we end up using reflects the accurate slide index.
    const focusPath = [...path];
    focusPath[0] = slideIndex;

    // If clicking on an element in a sequence, we need to identify which of the sequence children was clicked,
    // since we can't put a click listeners on each one directly.
    if (sequence !== undefined) { // path should be > 1 because it should be an element
      const sequenceElements = sequence.children || [];
      const { currentTarget, target } = evt;
      if (target && currentTarget && currentTarget.children) {
        const { children } = currentTarget;
        if (children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            if (children[i].contains(target)) {
              if (sequenceElements.length > i && sequenceElements[i].path) {
                const childPath = sequenceElements[i].path;
                logger.trace(`Clicking on a sequence element at path ${childPath}`);
                select(editor, childPath, setHighlighted);
                return;
              }
            }
          }
        }
      }
      return; // works when we don't find the element being clicked
    }
    select(editor, focusPath, setHighlighted);
  }
};

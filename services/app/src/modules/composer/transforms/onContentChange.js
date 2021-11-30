// Change event handler.
import ObjectUtils from "../../../common/util/ObjectUtils";
import { EditorTransforms } from "../components/DeckEditor/services/transforms/EditorTransforms";

export const onContentChange = ({
  editor,
  currentContent,
  setContentState,
  setActiveSlide,
  activeSlide,
  slides,
  setSlides,
  sendServerUpdates,
  sendSlideUpdates,
  setHighlightedPath,
  setDirtyState,
}) => (newContent, options = { updateServer: true, updateSlides: true }) => {

  const hasChanged = !ObjectUtils.shallowEquals(newContent, currentContent);

  // Store content in local storage.
  setContentState(newContent);

  // Mark the active slide (currently being edited).
  if (editor.selection !== null && editor.selection !== undefined) {
    const [currentActiveSlide,] = EditorTransforms.currentSlide(editor);
    if ((currentActiveSlide === undefined && activeSlide !== undefined) ||
      (currentActiveSlide !== undefined && currentActiveSlide.id !== activeSlide)) {
      setActiveSlide(currentActiveSlide !== undefined ? currentActiveSlide.id : undefined);
    }
  }

  const { updateServer, updateSlides } = options;

  // Process the content state, if there are changes.
  if (hasChanged) {
    setDirtyState(true);
    setHighlightedPath(undefined);

    if (updateServer) {
      sendServerUpdates(currentContent, newContent);
    }
    if (updateSlides) {
      sendSlideUpdates(slides, setSlides, currentContent, newContent);
    }
  }
};

import { EditorTransforms } from "../../../services/transforms/EditorTransforms";

export const emptySlideState = (editor, slideNode) => EditorTransforms.isNodeEmpty(editor, slideNode) && EditorTransforms.isSlideEmpty(editor, slideNode);

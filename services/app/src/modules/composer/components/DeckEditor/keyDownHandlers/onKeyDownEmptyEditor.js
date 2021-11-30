import { Range } from 'slate';
import { isKeyHotkey } from "is-hotkey";
import { EditorTransforms } from "../services/transforms/EditorTransforms";
import { PARAGRAPH } from "../modules/plugins/component/paragraph/type";

// Handle backspace key events in an empty editor.
const isDeleteHotKey = isKeyHotkey('Backspace');
export const onKeyDownEmptyEditor = (event, editor) => {
  if (isDeleteHotKey(event) && EditorTransforms.atFirstPosition(editor)) {
    if (!EditorTransforms.isEmpty(editor, (editor, node) => node.type === PARAGRAPH)) {
      event.preventDefault();
      const { selection } = editor;
      if (selection && Range.isExpanded(selection)) {
        editor.deleteFragment();
      } else {
        editor.deleteBackward();
      }
    }
  }
};

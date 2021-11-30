import { ReactEditor } from "slate-react";

const isDOMNode = (value) => value instanceof Node;

const hasEditableTarget = (editor, target) => isDOMNode(target) && ReactEditor.hasDOMNode(editor, target, { editable: true });

export const onPasteInEditor = (editor, readOnly) => (event) => {
  if (
    hasEditableTarget(editor, event.target) &&
    !readOnly
  ) {
    event.preventDefault();
    ReactEditor.insertData(editor, event.clipboardData);
    return true;
  }
};

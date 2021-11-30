import { Editor, Node, Transforms } from "slate";
import { LINK } from "../type";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";

export const removeLinkAtSelection = (editor) => {
  const [node, path] = EditorTransforms.activeElement(editor);
  if (node && node.type === LINK) {
    Editor.withoutNormalizing(editor, () => {
      // Copy the text of the link and add as a text node.
      const textToCopy = Node.string(node);
      Transforms.removeNodes(editor, { at: path });
      Transforms.insertText(editor, textToCopy);
      Transforms.move(editor);
    });
  }
};

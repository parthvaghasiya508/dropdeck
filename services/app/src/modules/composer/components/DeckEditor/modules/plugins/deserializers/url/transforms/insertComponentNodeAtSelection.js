import { Editor, Path, Transforms } from "slate";
import { NodeTransforms } from "../../../../../services/transforms/NodeTransforms";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";

export const insertComponentNodeAtSelection = (editor, node) => {
  if (!node) return;
  const [targetNode, targetPath] = EditorTransforms.componentElement(editor);
  if (targetNode && targetPath) {
    if (targetNode && NodeTransforms.isTextNode(targetNode) && EditorTransforms.isNodeEmpty(editor, targetNode)) {
      // empty paragraph => we override the current node with the node fragment
      Editor.withoutNormalizing(editor, () => {
        Transforms.insertText(editor, '', { at: targetPath });
        Transforms.setNodes(editor, node, { at: targetPath, voids: true });
      });
    } else {
      // insert a new node
      Transforms.insertNodes(editor, node, { at: Path.next(targetPath), select: true });
    }
  }
};

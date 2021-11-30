import { Editor, Node } from "slate";
import { SlideTransforms } from "../../../../services/transforms/SlideTransforms";

export const filterEmptyNodes = (editor, nodes) => nodes.filter((node) => node && (
  Editor.isVoid(editor, node) ||
  SlideTransforms.isSlide(node) ||
  (Node.string(node).length > 0 && Node.string(node) !== "\n")));

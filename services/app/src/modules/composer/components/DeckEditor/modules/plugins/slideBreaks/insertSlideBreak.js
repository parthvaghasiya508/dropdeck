import { Editor, Transforms } from "slate";
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";
import { TITLE } from "../component/heading/one/type";

export const insertSlideBreak = (editor, path, splitSlide) => {
  if (!splitSlide) {
    splitSlide = editor.splitSlide;
  }
  Editor.withoutNormalizing(editor, () => {
    const [slideNode,] = EditorTransforms.getSlide(editor, path);
    const size = EditorTransforms.size(slideNode);
    const at = editor.selection || path;
    if (size > 1) {
      splitSlide({ openingElement: TITLE, at });
      if (path.length > 1) {
        const pathToRemove = [path[0], path[1]]; // remove the top level node
        try {
          Transforms.removeNodes(editor, {
            voids: false,
            at: pathToRemove
          });
        } catch (e) {
          // node didn't exist
        }
      }
    } else {
      splitSlide({ openingElement: TITLE, at });
      try {
        Transforms.delete(editor, { at: path });
      } catch (e) {
        // node didn't exist
      }
    }
  });
};

import { Editor } from "slate";
import { unhangRange } from "./unhangRange";
import { SelectionTransforms } from "../../../../services/transforms/SelectionTransforms";

export const getComponentElements = (
  editor,
  options = {}
) => {
  unhangRange(editor, options);

  const iterator = Editor.nodes(editor, options);
  if (iterator) {
    const entries = [];
    for (const [node, path] of iterator) {
      if (SelectionTransforms.isComponentElementPath(editor, path)) {
        entries.push([node, path]);
      }
    }
    return entries;
  }
  return [];
};

import { Editor, Transforms } from "slate";
import { getBlockAbove } from "@udecode/slate-plugins";
import { PARAGRAPH } from "../component/paragraph/type";
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";

/**
 * When inserting break at the start of an empty block, reset the block type to a default type.
 */
export const withBreakEmptyReset = ({
  types,
  defaultType = PARAGRAPH,
  onUnwrap,
}) => (editor) => {

  const { insertBreak } = editor;

  editor.insertBreak = () => {
    const blockEntry = getBlockAbove(editor);

    const [block] = blockEntry;

    if (EditorTransforms.isNodeEmpty(editor, block)) {
      const parent = Editor.above(editor, {
        match: (n) => types.includes(n.type),
      });

      if (parent) {
        Transforms.setNodes(editor, { type: defaultType });
        if (onUnwrap) {
          onUnwrap();
        }
        return;
      }
    }
    insertBreak();
  };

  return editor;
};

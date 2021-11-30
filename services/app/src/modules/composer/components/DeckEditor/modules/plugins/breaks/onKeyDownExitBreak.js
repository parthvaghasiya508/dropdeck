import { getBlockAbove, isNodeType } from "@udecode/slate-plugins";
import { Range, Node, Editor, Text } from "slate";
import { isLineBreakHotKey } from "../slideBreaks/onKeyDownSlideBreaks";
import { logger } from "../../../../../../../common/util/logger";

/**
 * Exit a multi-line block when the user presses Enter in an empty final line.
 *
 * @param types
 */
export const onKeyDownExitBreak = ({ query }) => (event, editor) => {
  if (isLineBreakHotKey(event)) {
    const entry = getBlockAbove(editor);
    const node = entry[0];
    if (node && isNodeType(entry, query)) {
      const { selection } = editor;
      if (selection && Range.isRange(selection) && Range.isCollapsed(selection)) {
        const { offset } = selection.anchor;
        const [leaf] = Editor.node(editor, selection);
        if (leaf && Text.isText(leaf)) {
          const text = Node.string(leaf);
          if (text && text.length >= offset) {
            const beginningOfLine = offset > 0 ? text.charAt(offset - 1) === '\n' : true;
            if (beginningOfLine) {
              const remainder = text.substring(offset);
              if (remainder !== undefined && remainder.length === 0) {
                logger.debug(`Exiting ${node.type} element block`);
                event.preventDefault();
                Editor.withoutNormalizing(editor, () => {
                  editor.deleteBackward();
                  editor.insertParagraph();
                });
              }
            }
          }
        }
      }
    }
  }
};

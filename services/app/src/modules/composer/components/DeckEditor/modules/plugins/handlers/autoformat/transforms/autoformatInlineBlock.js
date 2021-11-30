import { autoformatBlock } from './autoformatBlock';
import { getRangeBefore } from "../queries/getRangeBefore";

/**
 * Autoformat in the middle of a block
 */
export const autoformatInlineBlock = (
  editor,
  {
    type,
    markup,
    preFormat,
    format,
  }
) => {
  const markupRange = getRangeBefore(editor, editor.selection, {
    matchString: markup,
    skipInvalid: true,
  });

  if (markupRange) {
    autoformatBlock(editor, type, markupRange, {
      preFormat: () => {
        editor.insertBreak();
        // eslint-disable-next-line no-unused-expressions
        preFormat?.(editor);
      },
      format,
    });

    return true;
  }
};

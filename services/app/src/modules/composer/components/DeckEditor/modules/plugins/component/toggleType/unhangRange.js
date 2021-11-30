import { Editor, Range } from "slate";

/**
 * Return {@link Editor.unhangRange} if `unhang` is true and if `at` (default: selection) is a range.
 */
export const unhangRange = (
  editor,
  options = {}
) => {
  const { at = editor.selection, voids, unhang = true } = options;

  if (Range.isRange(at) && unhang) {
    options.at = Editor.unhangRange(editor, at, { voids });
  }
};

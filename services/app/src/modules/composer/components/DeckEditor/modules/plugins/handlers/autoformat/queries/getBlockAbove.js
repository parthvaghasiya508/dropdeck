import { Editor } from 'slate';

/**
 * Get the block above a location (default: selection).
 * If not found, return the editor entry.
 */
export const getBlockAbove = (
  editor,
  options = {}
) => Editor.above(editor, {
  match: (n) => Editor.isBlock(editor, n),
  ...options,
}) || [editor, []];

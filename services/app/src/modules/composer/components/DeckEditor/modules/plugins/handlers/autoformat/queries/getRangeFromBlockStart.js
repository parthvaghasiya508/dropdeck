import { Editor } from 'slate';
import { getBlockAbove } from './getBlockAbove';
import { getPointFromLocation } from './getPointFromLocation';

/**
 * Get the range from the start of the block above a location (default: selection) to the location.
 */
export const getRangeFromBlockStart = (
  editor,
  options = {}
) => {
  const [, path] = getBlockAbove(editor, options);

  const start = Editor.start(editor, path);

  const focus = getPointFromLocation(editor, options);

  if (!focus) return;

  return { anchor: start, focus };
};

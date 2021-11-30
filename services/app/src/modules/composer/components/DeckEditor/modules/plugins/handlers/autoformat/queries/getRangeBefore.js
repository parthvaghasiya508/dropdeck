import { Editor } from 'slate';
import { getPointBefore } from './getPointBefore';

/**
 * Get range from {@link getPointBefore} to the end point of `at`.
 */
export const getRangeBefore = (
  editor,
  at,
  options
) => {
  const anchor = getPointBefore(editor, at, options);
  if (!anchor) return;

  const focus = Editor.point(editor, at, { edge: 'end' });

  return {
    anchor,
    focus,
  };
};

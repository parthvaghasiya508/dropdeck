import castArray from 'lodash/castArray';
import { Editor } from 'slate';

/**
 * Get the block above a location (default: selection) by type.
 */
export const getAboveByType = (
  editor,
  types,
  options = {}
) => {
  types = castArray(types);

  return Editor.above(editor, {
    match: (n) => types.includes(n.type),
    ...options,
  });
};

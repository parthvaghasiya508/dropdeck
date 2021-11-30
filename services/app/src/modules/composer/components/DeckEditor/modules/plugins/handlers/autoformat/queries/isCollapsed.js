import { Range } from 'slate';

/**
 * See {@link Range.isCollapsed}.
 * Return false if `range` is not defined.
 */
export const isCollapsed = (range) => !!range && Range.isCollapsed(range);

import { Editor } from 'slate';

/**
 * See {@link Editor.string}.
 * If `at` is not defined, return an empty string.
 */
export const getText = (editor, at) => (at && Editor.string(editor, at)) ?? '';

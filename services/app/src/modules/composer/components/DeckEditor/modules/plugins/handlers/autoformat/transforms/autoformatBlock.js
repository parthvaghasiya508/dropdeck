import { Editor, Transforms } from 'slate';

export const autoformatBlock = (
  editor,
  type,
  at,
  {
    preFormat,
    format,
  }
) => {
  Transforms.delete(editor, { at });

  if (preFormat) {
    // eslint-disable-next-line no-unused-expressions
    preFormat?.(editor);
  }

  if (!format) {
    Transforms.setNodes(
      editor,
      { type },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  } else {
    format(editor);
  }
};

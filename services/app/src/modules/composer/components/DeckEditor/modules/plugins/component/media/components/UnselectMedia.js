import { Transforms } from 'slate';

export const toggleSelection = (event, editor, selected) => {
  if (selected) {
    Transforms.deselect(editor);
    event.preventDefault();
    event.stopPropagation();
  }
};

export const encodeHistory = (editor) => {
  if (!editor || !editor.history) {
    return '';
  }
  const { history } = editor;
  return (history ? `${encodeStack(history.undos)}#${encodeStack(history.redos)}` : '');
};

const encodeStack = (stack) => stack.map((array) => array.length).join(',');

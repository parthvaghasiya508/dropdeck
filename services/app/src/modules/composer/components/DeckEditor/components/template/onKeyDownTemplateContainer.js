export const onKeyDownTemplateContainer = (onCancel) => (e) => {
  if (e.key === 'Escape') {
    onCancel();
    e.preventDefault();
    e.stopPropagation();
  }
};

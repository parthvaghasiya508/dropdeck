export const closeTemplateMenu = (setShowTemplateMenu, setTemplateMenuAnchorEl) => () => {
  setTemplateMenuAnchorEl(null);
  setShowTemplateMenu(false);
};

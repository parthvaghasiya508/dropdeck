/**
 * Split the active slide (or at a certain location) and toggle template menu on.
 *
 * @param editor
 * @param toggleTemplateMenu
 * @returns {function(...[*]=)}
 */
export const splitSlide = (editor, showMenu) => (options) => {
  editor.splitSlide(options);
  showMenu();
};

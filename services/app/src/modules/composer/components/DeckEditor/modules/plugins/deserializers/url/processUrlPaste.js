export const processUrlPaste = (plugins) => (url, contentType, setPasteComponent) => {

  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    if (plugin.pasteHandler) {
      const { matches, component } = plugin.pasteHandler;

      if (matches !== undefined && matches(url, contentType)) {
        if (component) {
          setPasteComponent(component);
          return true;
        }
      }
    }
  }
  return false;
};

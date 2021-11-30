import { isKeyHotkey } from "is-hotkey";

const isCommandTemplateToggle = (event) => isKeyHotkey('Mod+Shift+R')(event);

export const onKeyDownToggleTemplateDrawer = (toggleTemplateMenu) => (event, editor) => {
  if (isCommandTemplateToggle(event)) {
    event.preventDefault();
    toggleTemplateMenu();
  }
};

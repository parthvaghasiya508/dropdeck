import { isKeyHotkey } from "is-hotkey";

const isCtrlKHotKey = (event) => isKeyHotkey('mod+k')(event);

export const onKeyDownLinkMenu = (toggleLinkMenu) => (event, editor) => {
  if (isCtrlKHotKey(event)) {
    event.preventDefault();
    if (editor.selection && editor.selection !== null) {
      toggleLinkMenu();
    }
  }
};

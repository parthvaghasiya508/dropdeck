import React from "react";
import { useHistory } from "react-router-dom";
import { GlobalHotKeys, HotKeys } from "react-hotkeys";
import KeyboardShortcuts from "./common/components/KeyboardShortcuts";
import { ROUTE_NEW_DECK, ROUTE_ROOT } from "./Routes";
import { goBackOrReload } from "./modules/presenter/queries/goBackOrReload";

const KeyboardHandler = ({ children, noFocus, keyMap, signals, reload, global }) => {

  const [open, setOpen] = React.useState(false);

  const Handler = global ? GlobalHotKeys : HotKeys;
  const history = useHistory();

  const focus = (c) => {
    if (!noFocus && c && !c.contains(document.activeElement)) {
      c.focus();
    }
  };

  const defaultKeyMap = {
    GO_HOME: ["meta+shift+h", "ctrl+shift+h"],
    CREATE_DECK: ["meta+shift+n", "ctrl+shift+n"],
    SHOW_KEYBOARD_SHORTCUTS: ["meta+shift+?", "ctrl+shift+?"],
  };

  const handlers = {
    SHOW_KEYBOARD_SHORTCUTS: (e) => {
      e.preventDefault();
      setOpen(true);
    },
    CREATE_DECK: (e) => {
      e.preventDefault();
      history.push(ROUTE_NEW_DECK);
    },
    GO_HOME: (e) => {
      e.preventDefault();
      history.push(ROUTE_ROOT);
    },

    ESCAPE: goBackOrReload(reload, history, signals),
  };

  return (
    <Handler keyMap={keyMap || defaultKeyMap} handlers={handlers} innerRef={focus}>
      {children}
      <KeyboardShortcuts open={open} setOpen={setOpen}/>
    </Handler>
  );
};
export default KeyboardHandler;

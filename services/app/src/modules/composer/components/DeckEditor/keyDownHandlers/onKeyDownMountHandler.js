import { useEffect } from "react";
import { isKeyHotkey } from "is-hotkey";

const MountHandlerToKeyDown = (key, action) => {
  useEffect(() => {
    const isKey = (event) => isKeyHotkey(key)(event);

    const handleKeyDown = (event) => {
      if (isKey(event)) action();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default MountHandlerToKeyDown;

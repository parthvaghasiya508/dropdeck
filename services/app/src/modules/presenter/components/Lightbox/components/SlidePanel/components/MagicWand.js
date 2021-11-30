import React, { useCallback, useState } from "react";
import { IconButton, useTheme } from "@material-ui/core";
import WandDark from "../icon-wand-dark.svg";
import Wand from "../icon-wand-light.svg";
import WandDarkBlur from "../icon-wand-dark-blur.svg";
import WandBlur from "../icon-wand-light-blur.svg";

const onClassChange = (setAnimationClass) => (cls) => {
  if (cls === "buttonUp") {
    setAnimationClass("buttonUp");
    setTimeout(() => {
      setAnimationClass("");
    }, 300);
  } else {
    setAnimationClass(cls);
  }
};

export const MagicWand = ({ disabled = false, drawerOpen, handleClick, setAnimationClass, size = 52 }) => {
  const sizeInPx = `${size}px`;
  const appTheme = useTheme();
  const handleClass = useCallback(onClassChange(setAnimationClass), []);

  return (
    <IconButton
      className={`${drawerOpen ? "drawerOpen" : ""} solid`}
      onClick={handleClick}
      disabled={disabled}
      onMouseDown={() => handleClass("buttonDown")}
      onMouseEnter={() => handleClass("buttonHover")}
      onMouseLeave={() => handleClass("")}
      onMouseUp={() => handleClass("buttonUp")}>

      <img className="wand" alt="remix-panel" src={appTheme.dark() ? WandDark : Wand} height={52} width={52} style={{ height: sizeInPx, width: sizeInPx, borderRadius: '50%', }}/>
      <img className="wandBlur" alt="remix-panel" src={appTheme.dark() ? WandDarkBlur : WandBlur} height={52} width={52} style={{ height: sizeInPx, width: sizeInPx }}/>
    </IconButton>
  );
};

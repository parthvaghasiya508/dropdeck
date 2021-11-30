import IconButton from "@material-ui/core/IconButton";
import React from "react";

export const slideControlIconStyle = { height: 18, width: 18 };

export const SlideControlButton = ({ icon, onClick, style, className, disabled, ...props }) => (
  <IconButton onClick={onClick} size="small" style={{ padding: 4, ...style }} className={className} disabled={disabled} {...props}>
    {icon}
  </IconButton>
);

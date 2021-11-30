import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import { ContextMenu } from "../../../components/ContextMenu/ContextMenu";

export const GutterIcon = ({
  icon,
  handleClick,
  nodeType,
  readOnly,
  dragRef,
  showContextMenu,
  contextMenuComponent,
  path,
}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  if (readOnly) {
    return (
      <div>
        <IconButton className={`icon type-${nodeType}`}>
          {icon}
        </IconButton>
      </div>
    );
  }
  if (showContextMenu) {
    const onClick = (evt) => {
      if (anchorEl === null) {
        setAnchorEl(evt.currentTarget);
      } else {
        setAnchorEl(null);
      }
    };

    const onClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          onClick={onClick}
          className={`icon type-${nodeType} regular`}
          ref={dragRef}
          onMouseDown={(e) => e.stopPropagation()}
          disabled={readOnly}>

          {icon}
        </IconButton>
        <ContextMenu
          component={contextMenuComponent}
          path={path}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          onClose={onClose}
        />
      </div>
    );
  }
  return (
    <div>
      <IconButton
        onClick={handleClick}
        className={`icon type-${nodeType} component-picker`}
        ref={dragRef}
        onMouseDown={(e) => e.stopPropagation()}
        disabled={readOnly}>

        {icon}
      </IconButton>
    </div>
  );
};

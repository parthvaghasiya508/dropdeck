import React from "react";
import { EDITOR_ELEMENT_DROPLINE, EDITOR_ELEMENT_DROPLINE_INACTIVE } from "../gutter/renderElementWithGutter";

export const DropLine = ({
  path,
  active,
  style = {},
}) => {
  const dropLineClassName = `${EDITOR_ELEMENT_DROPLINE} ${!active ? EDITOR_ELEMENT_DROPLINE_INACTIVE : active}`;
  return <div style={style} className={dropLineClassName} contentEditable={false} data-path={JSON.stringify(path)} />;

};

import { IconButton, Tooltip } from "@material-ui/core";
import { Link } from "@material-ui/icons";
import React from 'react';
import { ReactEditor, useEditor } from "slate-react";
import { Transforms } from "slate";
import { LINK } from "../type";
import { useEditorOperations } from "../../../../../hooks/useEditorOperations";

export const LinkEditorElement = ({ attributes, children, element }) => {
  const operations = useEditorOperations();
  const editor = useEditor();
  const { toggleLinkMenu } = operations;
  const handleClick = (event) => {
    event.preventDefault();
    if (toggleLinkMenu) {
      const path = ReactEditor.findPath(editor, element);
      Transforms.select(editor, path);
      toggleLinkMenu();
    }
  };
  return (
    <span {...attributes} className="link" data-slate-type={LINK}>
      {children}<Tooltip title="Edit link" placement="top" arrow><IconButton tooltip="Hello" size="small" onClick={handleClick}><Link/></IconButton></Tooltip>
    </span>
  );
};

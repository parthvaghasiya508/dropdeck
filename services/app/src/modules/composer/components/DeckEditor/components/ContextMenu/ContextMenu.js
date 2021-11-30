import React, { useCallback } from "react";
import { ReactEditor, useEditor } from "slate-react";
import { Backspace } from "@material-ui/icons";
import { Editor, Path, Transforms, Node } from "slate";
import Button from "@material-ui/core/Button";
import Popup from "../../../../../../common/components/popup/Popup/Popup";
import { contextMenuStyles } from "./ContextMenu.styles";
import { logger } from "../../../../../../common/util/logger";

const CONTEXT_MENU_WIDTH = 266;

const deleteIcon = (
  <Backspace style={{
    fontSize: "1.1em",
    marginLeft: 8,
    marginRight: 5,
    marginBottom: 1
  }}/>
);

export const ContextMenu = ({ anchorEl, setAnchorEl, onClose, onClickOptions, component, path }) => {
  const ContextMenuComponent = component;
  const editor = useEditor();
  const open = Boolean(anchorEl);

  const onDelete = (event) => {
    Transforms.removeNodes(editor, {
      at: path,
      hanging: true,
    });
    try {
      const previousPath = path[path.length - 1] > 0 ? Path.previous(path) : undefined;
      if (previousPath) {
        const [lastNode, lastPath] = Editor.last(editor, previousPath);
        if (lastNode && lastPath) {
          Transforms.select(editor, { path: lastPath, offset: Node.string(lastNode).length });
          ReactEditor.focus(editor);
        }
      } else {
        Transforms.select(editor, path);
        ReactEditor.focus(editor);
      }
    } catch (e) {
      logger.error(e);
    }
    setAnchorEl(null);
    event.preventDefault();
  };

  const useStyles = useCallback(contextMenuStyles(), []);
  const classes = useStyles();

  return Path.isPath(path) ? (
    <Popup
      instant
      defaultPlacement="bottom"
      anchor={anchorEl}
      setAnchor={setAnchorEl}
      onClose={onClose}
      open={open}
      width={CONTEXT_MENU_WIDTH}
    >
      <div className={`${classes.context}`}>
        {
          ContextMenuComponent ? (
            <div style={{ marginBottom: -10 }}><ContextMenuComponent editor={editor} path={path} /></div>
          ) : null
        }
        <div style={{ padding: 10 }}>
          <div key="context-option-delete">
            <Button color="primary" variant="text" size="small" startIcon={deleteIcon} onClick={onDelete}>Delete</Button>
          </div>
        </div>
      </div>
    </Popup>
  ) : null;
};

import React, { useCallback } from "react";
import "./TableCellElement.scss";
import { ReactEditor, useEditor } from "slate-react";
import IconButton from "@material-ui/core/IconButton";
import { Add, ArrowDropDown, Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Popup from "../../../../../../../../../../common/components/popup/Popup/Popup";
import MiniMenuOptions from "../../../../MiniMenuOptions";
import { addColumn } from "../../transforms/addColumn";
import { deleteColumn } from "../../transforms/deleteColumn";
import { getDimensions } from "../../queries/getDimensions";
import { getAboveByType } from "../../transforms/getAboveByType";
import { TableType } from "../../type";

const tableHeaderElementStyles = () => makeStyles((theme) => ({
  root: {
  },
  popupButton: {
    userSelect: "none",
    position: "relative",
    marginRight: -25,
    top: -28,
    left: "50%",
    transform: "translateX(-50%) scale(1,1) translateY(0)",
    transition: "transform 300ms ease",
    color: theme.palette.icon.primary,
    "&:hover": {
      color: theme.palette.icon.primaryHover,
      transform: "translateX(-50%) scale(1.2,1.2) translateY(-4px)",
      transition: "transform 300ms ease"
    }
  }
}), { meta: 'TableCellElement' });
const TableHeaderCellElement = ({
  element,
  attributes,
  children,
}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const useStyles = useCallback(tableHeaderElementStyles(), []);
  const classes = useStyles();

  let lastColumn = true;
  let currentCellPath;
  const editor = useEditor();
  try {
    currentCellPath = ReactEditor.findPath(editor, element);
    const currentTableItem = getAboveByType(editor, TableType.TABLE, { at: currentCellPath });
    const { cols } = getDimensions(currentTableItem[0]);
    lastColumn = cols === 1;
  } catch (e) {
    // do nothing!
  }

  const handleAddColumn = () => {
    if (currentCellPath) {
      addColumn(editor, currentCellPath);
    }
    setAnchorEl(null);
  };

  const handleDeleteColumn = () => {
    if (currentCellPath) {
      deleteColumn(editor, currentCellPath);
    }
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Popup
        instant
        defaultPlacement="top"
        anchor={anchorEl}
        setAnchor={setAnchorEl}
        width="auto"
        style={{ boxShadow: 'none', padding: 0, borderRadius: 6 }}
        open={open}>

        <div style={{ display: "flex", zIndex: 10001 }}>
          <MiniMenuOptions>
            <ToggleButton size="small" onClick={handleAddColumn} value="header">
              <Add/>
            </ToggleButton>
            { !lastColumn ? (
              <ToggleButton onClick={handleDeleteColumn}>
                <Delete/>
              </ToggleButton>
            ) : null}
          </MiniMenuOptions>
        </div>
      </Popup>
      <td {...attributes}><IconButton size="small" onClick={handleClick} className={classes.popupButton}><ArrowDropDown style={{ fontSize: 20 }} /></IconButton>{ children }</td>
    </React.Fragment>
  );
};

export const TableCellElement = ({
  element,
  attributes,
  children,
}) => {

  const editor = useEditor();
  const path = ReactEditor.findPath(editor, element);
  const firstRow = path && path.length > 2 ? path[path.length - 2] === 0 : false;

  return firstRow ? <TableHeaderCellElement attributes={attributes} element={element}>{ children }</TableHeaderCellElement> : <td {...attributes}>{ children }</td>;
};

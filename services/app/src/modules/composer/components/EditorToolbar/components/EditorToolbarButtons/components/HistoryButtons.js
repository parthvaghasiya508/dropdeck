import ToggleButton from "@material-ui/lab/ToggleButton";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { useEditor } from "slate-react";

const emptyOpsStack = (ops) => {

  const isEmpty = (
    ops.length === 0 || (ops.length === 1 && ops[0].length === 1 && ops[0][0].type === 'set_selection')
  );
  return isEmpty;
};

export const HistoryButtons = () => {
  const editor = useEditor();
  return (
    <ToggleButtonGroup>
      <ToggleButton
        disabled={emptyOpsStack(editor.history.undos)}
        value="undo"
        variant="outlined"
        size="small"
        aria-label="undo"
        onMouseDown={(event) => {
          event.preventDefault();
          editor.undo();
        }}
      >
        <UndoIcon />
      </ToggleButton>
      <ToggleButton
        disabled={emptyOpsStack(editor.history.redos)}
        value="redo"
        variant="outlined"
        size="small"
        aria-label="redo"
        onMouseDown={(event) => {
          event.preventDefault();
          editor.redo();
        }}
      >
        <RedoIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

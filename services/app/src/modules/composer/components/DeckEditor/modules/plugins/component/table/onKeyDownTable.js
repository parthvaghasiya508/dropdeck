import { isKeyHotkey } from "is-hotkey";
import { isNodeTypeIn, isRangeAtRoot } from "@udecode/slate-plugins";
import { Action, moveInTable } from "./transforms/moveInTable";
import { TableType } from "./type";

const isShiftTabHotKey = (event) => isKeyHotkey('Shift+Tab')(event);

const TableHotKey = {
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
};

export const onKeyDownTable = () => (e, editor) => {
  if (Object.values(TableHotKey).includes(e.key)) {
    if (
      editor.selection &&
      isNodeTypeIn(editor, TableType.TABLE) &&
      !isRangeAtRoot(editor.selection)
    ) {

      e.preventDefault();
      switch (e.key) {
        case TableHotKey.ARROW_UP:
          moveInTable(editor, Action.MOVE_UP);
          break;
        case TableHotKey.ARROW_DOWN:
          moveInTable(editor, Action.MOVE_DOWN);
          break;
        case TableHotKey.TAB:
          if (isShiftTabHotKey(e)) {
            moveInTable(editor, Action.SHIFT_LEFT);
          } else {
            moveInTable(editor, Action.SHIFT_RIGHT);
          }
          break;
      }
    }
  }
};

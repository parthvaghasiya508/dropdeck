import { isNodeTypeIn } from "@udecode/slate-plugins";
import { Editor, Transforms } from 'slate';
import { getAboveByType } from "./getAboveByType";
import { TableType } from "../type";

export const deleteColumn = (editor, currentCellPath) => {

  if (isNodeTypeIn(editor, TableType.TABLE)) {
    const currentRowItem = getAboveByType(editor, TableType.ROW, { at: currentCellPath });
    const currentTableItem = getAboveByType(editor, TableType.TABLE, { at: currentCellPath });

    if (
      currentCellPath &&
      currentRowItem &&
      currentTableItem &&
      // Cannot delete the last cell
      currentRowItem[0].children.length > 1
    ) {
      const pathToDelete = currentCellPath.slice();
      const replacePathPos = pathToDelete.length - 2;

      Editor.withoutNormalizing(editor, () => {
        currentTableItem[0].children.forEach((row, rowIdx) => {
          pathToDelete[replacePathPos] = rowIdx;
          Transforms.removeNodes(editor, {
            at: pathToDelete,
          });
        });
      });
    }
  }
};

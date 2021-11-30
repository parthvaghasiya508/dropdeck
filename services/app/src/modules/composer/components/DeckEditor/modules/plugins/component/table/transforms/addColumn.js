import { Path, Transforms } from "slate";
import { isNodeTypeIn } from "@udecode/slate-plugins";
import { getAboveByType } from "./getAboveByType";
import { defaultTableTypes } from "../utils/defaultTableTypes";
import { getEmptyCellNode } from "./getEmptyCellNode";
import { TableType } from "../type";

export const addColumn = (editor, currentCellItemPath, options = defaultTableTypes) => {

  if (isNodeTypeIn(editor, TableType.TABLE)) {
    // const currentCellItem = getAboveByType(editor, [TableType.CELL, TableType.HEAD], { at: path });
    const currentTableItem = getAboveByType(editor, TableType.TABLE, { at: currentCellItemPath });

    if (currentCellItemPath && currentTableItem) {
      const nextCellPath = Path.next(currentCellItemPath);
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = nextCellPath[replacePathPos];

      currentTableItem[0].children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;

        Transforms.insertNodes(editor, getEmptyCellNode({ ...options }), {
          at: newCellPath,
          select: rowIdx === currentRowIdx,
        });
      });
    }
  }
};

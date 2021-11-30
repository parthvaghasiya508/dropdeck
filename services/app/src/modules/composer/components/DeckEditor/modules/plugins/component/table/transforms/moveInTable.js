/**
 * Move the current selection up to the immediate cell in the row above (if selection is still in the table) or
 * to the preceding element in the editor, if not a
 * @param editor
 */
import { addRow, getNodesByType } from "@udecode/slate-plugins";
import { Path, Range, Transforms } from "slate";
import { getDimensions } from "../queries/getDimensions";
import { logger } from '../../../../../../../../../common/util/logger';
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";
import { TablePathTransforms } from "../utils/TablePathTransforms";
import { TableType } from "../type";

export const Action = {
  MOVE_UP: 'up',
  MOVE_DOWN: 'down',
  SHIFT_LEFT: 'left',
  SHIFT_RIGHT: 'right',
};

export const moveInTable = (editor, action) => {

  const [tableMatch] = getNodesByType(editor, [TableType.TABLE]);
  if (tableMatch !== undefined) {
    const [tableElement, tablePath] = tableMatch;
    const dimensions = getDimensions(tableElement);
    const { balanced } = dimensions;
    if (!balanced) {
      logger.warn(`Table element at path ${tablePath} is unbalanced - not moving cursor within the table`);
      return;
    }

    const [cellMatch] = getNodesByType(editor, [TableType.CELL]);
    if (cellMatch !== undefined) {
      const [cellElement, cellPath] = cellMatch;
      if (cellElement !== undefined && cellPath !== undefined) {
        const currentLocation = Range.end(editor.selection);
        const newLocation = moveTo(editor, currentLocation, action, dimensions, tablePath);
        if (newLocation) {
          Transforms.select(editor, newLocation);
        }
      }
    }
  }
};

const moveTo = (editor, location, action, dimensions, tablePath) => {
  if (!location) {
    return location;
  }
  const { path, offset } = location;
  const { cols, rows } = dimensions;
  if (path.length <= 2) {
    return undefined;
  }
  const col = TablePathTransforms.getColIndex(tablePath, path);
  const row = TablePathTransforms.getRowIndex(tablePath, path);
  if (col === -1 || row === -1) {
    return undefined;
  }

  switch (action) {

    case Action.MOVE_UP:

      // Case 1: Not the top row so we can move within the table.
      if (row > 0) {
        const newPath = TablePathTransforms.shiftRowIndex(tablePath, path, -1);
        const leafLocation = EditorTransforms.lastLocation(editor, newPath);
        if (leafLocation) {
          return { path: newPath, offset: Math.min(leafLocation.offset, offset) };
        }
        return undefined;
      }

      // Case 2: Moving to the previous sibling of the table.
      try {
        const previousSiblingPath = Path.previous(tablePath);
        if (previousSiblingPath) {
          const leafLocation = EditorTransforms.lastLocation(editor, previousSiblingPath);
          if (leafLocation) {
            return { path: leafLocation.path, offset: Math.min(leafLocation.offset, offset) };
          }
        }
      } catch (e) {
        logger.error(e);
      }

      return undefined;

    case Action.MOVE_DOWN:

      // Case 1: Not the bottom row so we can move within the table.
      if (row < rows - 1) {
        const newPath = TablePathTransforms.shiftRowIndex(tablePath, path, 1);
        const leafLocation = EditorTransforms.lastLocation(editor, newPath);
        if (leafLocation) {
          return { path: newPath, offset: Math.min(leafLocation.offset, offset) };
        }
        return undefined;
      }

      // Case 2: Moving to the next sibling of the table.
      const nextSiblingPath = Path.next(tablePath);
      if (nextSiblingPath) {
        const leafLocation = EditorTransforms.lastLocation(editor, nextSiblingPath);
        if (leafLocation) {
          return { path: leafLocation.path, offset: Math.min(leafLocation.offset, offset) };
        }
      }

      return undefined;

    case Action.SHIFT_RIGHT:

      let totalRows = rows;

      // If we're in the last cell of the table, we add a new row below.
      if (col === cols - 1 && row === rows - 1) {
        addRow(editor);
        totalRows++;
      }

      const newPath = (col === cols - 1) ?
        TablePathTransforms.setColIndex(tablePath, TablePathTransforms.shiftRowIndex(tablePath, path, 1), 0) :
        TablePathTransforms.shiftColIndex(tablePath, path, 1);

      const leafLocation = EditorTransforms.lastLocation(editor, newPath);
      if (leafLocation) {
        return leafLocation.path; // we want to select the contents of the cell so just return the path
      }
      return undefined;

    case Action.SHIFT_LEFT:

      // If we're in the first cell of the table, we do nothing.
      if (col !== 0 || row !== 0) {
        const newPath = (col === 0) ?
          TablePathTransforms.setColIndex(tablePath, TablePathTransforms.shiftRowIndex(tablePath, path, -1), cols - 1) :
          TablePathTransforms.shiftColIndex(tablePath, path, -1);

        const leafLocation = EditorTransforms.lastLocation(editor, newPath);
        if (leafLocation) {
          return leafLocation.path; // we want to select the contents of the cell so just return the path
        }
      }
      return undefined;
  }
};

import { Editor, Point, Transforms, Node } from "slate";
import { getNodesByType } from "@udecode/slate-plugins";
import { isCollapsed } from "../../handlers/autoformat/queries/isCollapsed";
import { getDimensions } from "./queries/getDimensions";
import { logger } from "../../../../../../../../common/util/logger";
import { TablePathTransforms } from "./utils/TablePathTransforms";
import { TableType } from "./type";

export const withTable = (options = { tdType: TableType.CELL, thType: TableType.HEAD }) => (editor) => {
  const { tdType, thType } = options;
  const matchCells = (node) => (node.type === tdType || node.type === thType);

  const { deleteBackward, deleteForward, deleteFragment, insertText } = editor;

  const preventDeleteCell = (
    operation,
    pointCallback,
    nextPoint
  ) => (unit) => {
    const { selection } = editor;

    if (isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: matchCells,
      });
      if (cell) {
        // Prevent deletions within a cell
        const [, cellPath] = cell;
        const start = pointCallback(editor, cellPath);

        if (selection && Point.equals(selection.anchor, start)) {
          return;
        }
      } else {
        // Prevent deleting cell when selection is before or after a table
        const next = nextPoint(editor, selection, { unit });
        const [nextCell] = Editor.nodes(editor, {
          match: matchCells,
          at: next,
        });
        if (nextCell) return;
      }
    }

    operation(unit);
  };

  editor.deleteFragment = () => {
    const { selection } = editor;

    const [tableMatch] = getNodesByType(editor, [TableType.TABLE]);
    if (tableMatch !== undefined) {
      const [tableElement, tablePath] = tableMatch;
      const dimensions = getDimensions(tableElement);
      const { cols, rows, balanced } = dimensions;
      if (!balanced) {
        logger.warn(`Table element at path ${tablePath} is unbalanced - not deleting fragment within the table`);
        return;
      }

      const [start] = Editor.nodes(editor, {
        match: matchCells,
        at: selection?.anchor.path,
      });
      const [end] = Editor.nodes(editor, {
        match: matchCells,
        at: selection?.focus.path,
      });

      // If the user selects whole rows, we delete the corresponding rows.
      if (start && end) {
        const startPath = start[1];
        const endPath = end[1];
        const startCol = TablePathTransforms.getColIndex(tablePath, startPath);
        const startRow = TablePathTransforms.getRowIndex(tablePath, startPath);
        const endCol = TablePathTransforms.getColIndex(tablePath, endPath);
        const endRow = TablePathTransforms.getRowIndex(tablePath, endPath);
        logger.trace(`Deleting from (${startCol}, ${startRow}) to (${endCol}, ${endRow})`);

        const colFrom = Math.min(startCol, endCol);
        const colTo = Math.max(startCol, endCol);
        const rowFrom = Math.min(startRow, endRow);
        const rowTo = Math.max(startRow, endRow);

        // We're deleting whole rows.
        if (colFrom === 0 && colTo === cols - 1) {

          // The whole table is selected:
          if (rowFrom === 0 && rowTo === rows - 1) {
            logger.trace(`Deleting the whole table`);
            Transforms.removeNodes(editor, {
              at: tablePath,
            });
            return;
          }
          logger.trace(`Deleting rows ${rowFrom} to ${rowTo}`);
          Editor.withoutNormalizing(editor, () => {
            for (let r = rowTo; r >= rowFrom; r--) {
              Transforms.removeNodes(editor, {
                at: tablePath.concat(r),
              });
            }
          });
          return;
        }
      }

      // Skip deletes if they start or end in a table cell, unless start & end in the same cell
      if ((start || end) && start?.[0] !== end?.[0]) {
        // Clear cells content
        const cells = Editor.nodes(editor, {
          match: matchCells,
        });
        for (const [, path] of cells) {
          for (const [, childPath] of Node.children(editor, path)) {
            Transforms.removeNodes(editor, { at: childPath });
          }
        }
        Transforms.collapse(editor);
        return;
      }
    }
    deleteFragment();
  };

  editor.insertText = (text) => {
    const { selection } = editor;
    // Collapse selection if multiple cells are selected to avoid breaking the table
    if (!isCollapsed(selection)) {
      const [start] = Editor.nodes(editor, {
        match: matchCells,
        at: selection?.anchor.path,
      });
      const [end] = Editor.nodes(editor, {
        match: matchCells,
        at: selection?.focus.path,
      });
      if ((start || end) && start?.[0] !== end?.[0]) {
        Transforms.collapse(editor, { edge: 'end' });
        insertText(text);
        return;
      }
    }
    insertText(text);
  };

  // prevent deleting cells with deleteBackward
  editor.deleteBackward = preventDeleteCell(
    deleteBackward,
    Editor.start,
    Editor.before
  );

  // prevent deleting cells with deleteForward
  editor.deleteForward = preventDeleteCell(
    deleteForward,
    Editor.end,
    Editor.after
  );

  return editor;
};

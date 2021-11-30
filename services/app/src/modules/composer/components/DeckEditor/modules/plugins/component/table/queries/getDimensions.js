import { TableType } from "../type";

export const getDimensions = (tableElement) => {
  let rows = 0;
  let cols = 0;
  let balanced = true;

  if (tableElement && tableElement.children) {
    tableElement.children.forEach((row) => {
      if (row.type && (row.type === TableType.HEAD || row.type === TableType.ROW)) {
        rows++;
        let cells = 0;
        row.children.forEach((cell) => {
          if (cell.type && cell.type === TableType.CELL) {
            cells++;
          }
        });
        if (cols === 0) {
          cols = cells;
        } else {
          if (cols !== cells) {
            balanced = false;
          }
          if (cells > cols) {
            cols = cells;
          }
        }
      } else {
        balanced = false;
      }
    });
  }

  return { rows, cols, balanced };
};

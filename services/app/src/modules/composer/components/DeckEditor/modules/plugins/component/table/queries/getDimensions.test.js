import { getDimensions } from "./getDimensions";
import { TableType } from "../type";

it('identifies the number of rows and columns in a table element', () => {
  const tableElement = {
    type: TableType.TABLE,
    children: [
      {
        type: TableType.ROW,
        children: [
          { type: TableType.CELL }, { type: TableType.CELL }, { type: TableType.CELL },
        ]
      },
      {
        type: TableType.ROW,
        children: [
          { type: TableType.CELL },{ type: TableType.CELL }, { type: TableType.CELL },
        ]
      }
    ]
  };
  const { cols, rows, balanced } = getDimensions(tableElement);
  expect(cols).toEqual(3);
  expect(rows).toEqual(2);
  expect(balanced).toBeTruthy();
});

it('identifies an unbalanced table element', () => {
  const tableElement = {
    type: TableType.TABLE,
    children: [
      {
        type: TableType.ROW,
        children: [
          { type: TableType.CELL }
        ]
      },
      {
        type: TableType.ROW,
        children: [
          { type: TableType.CELL },{ type: TableType.CELL },
        ]
      }
    ]
  };
  const { cols, rows, balanced } = getDimensions(tableElement);
  expect(cols).toEqual(2);
  expect(rows).toEqual(2);
  expect(balanced).toBeFalsy();
});

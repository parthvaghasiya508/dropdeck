import { TableType } from "../type";

export const getEmptyCellNode = (options = { header: false }) => ({
  type: options.header ? TableType.HEAD : TableType.CELL,
  children: [{ text: '' }],
});

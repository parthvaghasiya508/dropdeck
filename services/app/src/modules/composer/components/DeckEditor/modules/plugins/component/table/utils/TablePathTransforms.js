const ROW_OFFSET = 0;
const COL_OFFSET = 1;

const set = (tablePath, path, value, indexOffset) => {
  const newPath = [...path];
  newPath[tablePath.length + indexOffset] = value;
  return newPath;
};

const shift = (tablePath, path, offset, indexOffset) => {
  const newPath = [...path];
  newPath[tablePath.length + indexOffset] = newPath[tablePath.length + indexOffset] + offset;
  return newPath;
};

export const TablePathTransforms = {

  getRowIndex: (tablePath, path) => (path.length > tablePath.length + ROW_OFFSET ? path[tablePath.length + ROW_OFFSET] : -1),

  getColIndex: (tablePath, path) => (path.length > tablePath.length + COL_OFFSET ? path[tablePath.length + COL_OFFSET] : -1),

  shiftRowIndex: (tablePath, path, offset) => shift(tablePath, path, offset, ROW_OFFSET),

  shiftColIndex: (tablePath, path, offset) => shift(tablePath, path, offset, COL_OFFSET),

  setRowIndex: (tablePath, path, value) => set(tablePath, path, value, ROW_OFFSET),

  setColIndex: (tablePath, path, value) => set(tablePath, path, value, COL_OFFSET),

};

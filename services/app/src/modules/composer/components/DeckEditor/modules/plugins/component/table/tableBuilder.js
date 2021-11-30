import { TableType } from "./type";
import { simpleComponentBuilder } from "../../../../../../../../common/api/plugins/simpleComponentBuilder";

export const tableBuilder = {
  cell: simpleComponentBuilder(TableType.CELL),
  row: (...cells) => {
    if (!cells || cells.length === 0) {
      cells = [tableBuilder.cell()];
    }
    cells = cells.map((cell) => ((typeof cell === 'string') ? tableBuilder.cell(cell) : cell));
    return {
      type: TableType.ROW,
      children: cells,
    };
  },

  table: (...rows) => {
    if (!rows || rows.length === 0) {
      rows = [tableBuilder.row()];
    }
    return {
      type: TableType.TABLE,
      children: rows,
    };
  }
};

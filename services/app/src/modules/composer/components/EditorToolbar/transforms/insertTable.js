import { Transforms } from "slate";
import { getEmptyTableNode, getNodesByType } from "@udecode/slate-plugins";
import { defaultTableTypes } from "../../DeckEditor/modules/plugins/component/table/utils/defaultTableTypes";
import { TableType } from "../../DeckEditor/modules/plugins/component/table/type";

export const insertTable = (editor, options = defaultTableTypes) => {
  Transforms.insertNodes(editor, getEmptyTableNode(options));

  // Select the first cell of the table (otherwise the cursor ends up in the last cell):
  const [tableMatch] = getNodesByType(editor, [TableType.TABLE]);
  if (tableMatch !== undefined) {
    const [, tablePath] = tableMatch;
    Transforms.select(editor, tablePath.concat(0).concat(0));
  }

};

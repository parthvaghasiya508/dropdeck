import { isTable } from "@udecode/slate-plugins";
import { isList } from "../../core/withCoreEditing";
import { PARAGRAPH } from "../../component/paragraph/type";
import { defaultTableTypes } from "../../component/table/utils/defaultTableTypes";

const isTableNode = isTable(defaultTableTypes);

export const padFragment = (content) => {

  if (!content || !content.length) {
    return content;
  }
  const [firstNode] = content;

  // if the content to be inserted starts with a list node or a table,
  // we insert an empty paragraph before to work around a boundary
  // fragment issue.
  if (isList(firstNode) || isTableNode(firstNode)) {
    return [{
      type: PARAGRAPH,
      children: [{ text: '' }]
    }, ...content];
  }

  return content;

};

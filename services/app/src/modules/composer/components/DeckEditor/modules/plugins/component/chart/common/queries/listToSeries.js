import { Node } from "slate";
import { parseDataPoint } from "./parseDataPoint";
import { LIST_ITEM } from "../../../list/type";
import { PARAGRAPH } from "../../../paragraph/type";

export const listToSeries = (listNode, listType, defaultValue = 0) => {
  const data = [];
  if (listNode.children) {
    listNode.children.forEach((listItem) => {
      if (listItem.type === LIST_ITEM && listItem.children) {
        let dataPoint;
        let nestedSeries;
        listItem.children.forEach((node) => {
          if (node.type === listType) {
            if (nestedSeries === undefined) {
              nestedSeries = listToSeries(node, listType, defaultValue);
            }
          } else if (node.type === PARAGRAPH && dataPoint === undefined) {
            const text = Node.string(node);
            if (text !== undefined && text.length > 0) {
              const point = parseDataPoint(text, defaultValue);
              if (point) {
                dataPoint = point;
              }
            }
          }
        });
        if (dataPoint !== undefined) {
          if (nestedSeries !== undefined) {
            dataPoint.children = nestedSeries;
          }
          data.push(dataPoint);
        }
      }
    });
  }
  return data;
};

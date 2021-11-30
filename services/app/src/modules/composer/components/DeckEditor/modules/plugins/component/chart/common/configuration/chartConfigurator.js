import { Editor, Transforms } from "slate";
import { LIST_ITEM } from "../../../list/type";
import { PARAGRAPH } from "../../../paragraph/type";

export const chartConfigurator = (chartType, dataPoints = DEFAULT_DATA) => (editor, node, path) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.removeNodes(editor, { at: path });
    Transforms.insertNodes(editor, {
      type: chartType,
      children: dataPoints
    }, { at: path });

    const lastDataPointPath = path.concat(dataPoints.length - 1).concat(0).concat(0);
    const focus = { path: lastDataPointPath, offset: dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].children[0].children[0].text.length : 0 };

    const firstDataPointPath = path.concat(0).concat(0).concat(0);
    const anchor = { path: firstDataPointPath, offset: 0 };
    const target = { focus, anchor };
    Transforms.select(editor, target);
  });
  // callback();
};

const DEFAULT_DATA = [
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Agree, 45' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Disagree, 30' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Undecided, 25' }]
    }]
  },
];

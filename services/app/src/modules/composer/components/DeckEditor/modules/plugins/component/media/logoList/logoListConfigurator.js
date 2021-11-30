import { Editor, Transforms } from "slate";
import { LOGO_LIST } from "./type";
import { LIST_ITEM } from "../../list/type";
import { PARAGRAPH } from "../../paragraph/type";

const SAMPLE_DATA = [
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: '' }]
    }]
  },
];

export const logoListConfigurator = (editor, node, path, resolve) => {
  const dataPoints = SAMPLE_DATA;
  Editor.withoutNormalizing(editor, () => {
    Transforms.removeNodes(editor, { at: path });
    Transforms.insertNodes(editor, {
      type: LOGO_LIST,
      children: dataPoints,
    }, { at: path });

    const lastDataPointPath = path.concat(dataPoints.length - 1).concat(0);
    const target = { focus: { path: lastDataPointPath, offset: 0 }, anchor: { path: lastDataPointPath, offset: 0 } };
    Transforms.select(editor, target);
  });
  resolve();
};

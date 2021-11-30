import { Editor, Transforms } from "slate";
import { VENN_DIAGRAM } from "../type";

export const vennDiagramConfigurator = (editor, node, path, resolve) => {
  const dataPoints = SAMPLE_DATA;
  Editor.withoutNormalizing(editor, () => {
    Transforms.removeNodes(editor, { at: path });
    Transforms.insertNodes(editor, {
      type: VENN_DIAGRAM,
      children: dataPoints,
    }, { at: path });

    const lastDataPointPath = path.concat(dataPoints.length - 1).concat(0);
    const target = { focus: { path: lastDataPointPath, offset: 0 }, anchor: { path: lastDataPointPath, offset: 0 } };
    Transforms.select(editor, target);
  });
  resolve();
};

const SAMPLE_DATA = [
  {
    type: 'list-item',
    children: [{ text: 'A' }]
  },
  {
    type: 'list-item',
    children: [{ text: 'B' }]
  },
  {
    type: 'list-item',
    children: [{ text: '' }]
  }
];

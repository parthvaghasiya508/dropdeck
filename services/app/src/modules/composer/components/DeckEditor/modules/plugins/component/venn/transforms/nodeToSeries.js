import { Node } from "slate";

export const nodeToSeries = (nodes, defaultValue = 0) => {
  const data = [];
  // eslint-disable-next-line array-callback-return
  nodes.map((node, i) => {
    const text = Node.string(node);
    if (text !== undefined && text.length > 0) {
      const dataPointPattern = /([^,]*),\s*([0-9]+)/g;
      const match = dataPointPattern.exec(text);
      let label = text;
      let value = defaultValue;
      if (match) {
        [, label, value] = match;
      }
      data.push({ sets: [label], size: value });
    }
  });
  return data;
};

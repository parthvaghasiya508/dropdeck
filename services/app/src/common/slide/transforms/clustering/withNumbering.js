/**
 * Iterates through a forest of trees, adding a counter to each node.
 */
import { TYPE_CLUSTER, TYPE_SEQUENCE } from "./Types";

export const withNumbering = (trees) => {
  addNumbering(trees, 0);
  return trees;
};

const addNumbering = (nodes, i) => {
  nodes.forEach((node) => {
    i = addNumber(node, i);
  });
  return i;
};

const addNumber = (node, i) => {
  if (!node.kind) {
    return i;
  }
  switch (node.kind) {
    case TYPE_SEQUENCE:
      const newIndex = addNumbering(node.children, i);
      if (node.children.length > 0) {
        node.index = node.children[0].index; // copy the index of the first sequence element
      }
      return newIndex;
    case TYPE_CLUSTER:
      node.index = i++;
      return addNumbering(node.children, i);
    default:
      node.index = i++;
      return i;
  }
};

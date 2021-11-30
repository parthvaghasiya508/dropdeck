import { TYPE_CLUSTER, TYPE_SEQUENCE } from "../../../../../common/slide/transforms/clustering/Types";
import { getMarkupType } from "./getMarkupType";

export const cssClassName = (node, prefix) => {
  if (prefix) {
    return cssClasses(node).map((cls) => `${prefix}${cls}`).join(' ');
  }
  return cssClasses(node).join(' ');
};

const cssClasses = (node) => {
  switch (node.kind) {

    case TYPE_SEQUENCE:
      if (node.children.length > 0) {
        const classes = new Set();
        node.children.forEach((child) => {
          cssClasses(child).forEach((c) => classes.add(c));
        });
        return Array.from(classes);
      }
      return null;

    case TYPE_CLUSTER:
      return node.children.map((t) => cssClassName(t, 'cluster-'));

    default:
      return [getMarkupType(node)];
  }
};

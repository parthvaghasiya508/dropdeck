import { Node } from "slate";

const gatherLabels = (labels, node, textMap, nodeMap) => {
  if (!labels || !node) {
    return {};
  }
  Object.keys(labels).forEach((key) => {
    const label = labels[key];
    if (node.children.length > key) {
      const targetNode = node.children[key];
      if (targetNode) {
        const text = Node.string(targetNode);
        if (textMap[label]) {
          textMap[label].push(text);
        } else {
          textMap[label] = [text];
        }
        if (nodeMap[label]) {
          nodeMap[label].push(targetNode);
        } else {
          nodeMap[label] = [targetNode];
        }
      }
    }
  });
};

export default class TemplateRuleMatch {
  constructor(labels = {}, node) {
    this.textMap = {};
    this.nodeMap = {};
    this.found = labels !== undefined && Object.keys(labels).length > 0;
    gatherLabels(labels, node, this.textMap, this.nodeMap);
  }

  text(group, index = -1) {
    const strings = this.textMap[group];
    if (strings && index >= 0) {
      return strings.length > index ? strings[index] : undefined;
    }
    return strings && strings.length > 0 ? strings.join('\n') : undefined;
  }

  node(group) {
    const nodes = this.nodes(group);
    return nodes && nodes.length > 0 ? nodes[0] : undefined;
  }

  nodes(group) {
    return this.nodeMap[group];
  }
}

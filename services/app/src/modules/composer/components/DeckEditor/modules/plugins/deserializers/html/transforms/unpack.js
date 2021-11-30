/**
 * Checks the list of children of an element and validates that they are admissible as child nodes.
 * Returns a list of nodes, the original node along with any non-admissible child nodes (which now are siblings).
 *
 * @param node
 */
export const unpack = (plugins) => (node) => {
  const siblings = [];
  const validChildren = [];
  if (node && node.children) {
    node.children.forEach((child) => {
      if (isValidParent(node, child, plugins)) {
        validChildren.push(child);
      } else {
        siblings.push(child);
      }
    });

    // Unpack the node structure.
    if (siblings.length > 0) {
      node.children = validChildren;
      return [node, ...siblings];
    }
  }
  return node;
};

/**
 * Checks that the parent/child nodes are a valid pairing.
 */
const isValidParent = (parent, child, plugins) => {
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    if (plugin.type === child.type && plugin.canBeChildOf && !plugin.canBeChildOf(parent)) {
      return false;
    }
  }
  return true;
};

export const ensureChildNode = (nodes) => {
  const list = Array.isArray(nodes) ? nodes : [nodes];
  list.forEach((node) => {
    if (node && node.children && node.children.length === 0) {
      node.children.push({ text: '' });
    }
  });
  return nodes;
};

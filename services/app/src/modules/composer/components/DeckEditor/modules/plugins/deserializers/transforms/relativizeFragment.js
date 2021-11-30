/**
 * Rewrite a list of nodes, a document "fragment", that should be inserted
 *
 * @param fragment
 * @param targetNode
 * @param targetPath
 */

export const relativizeFragment = (fragment, parentNode, targetNode, targetPath) => {
  if (!fragment) {
    return fragment;
  }
  const relativizedNodes = [];
  fragment.forEach((node) => {
    relativizedNodes.push(node);
  });
  return relativizedNodes;
};

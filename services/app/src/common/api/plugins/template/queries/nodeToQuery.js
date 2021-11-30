import { Node } from "slate";

/**
 * Map the text content of a node to a string query.
 *
 * @param slideNode
 * @returns {string}
 */
export const nodeToQuery = (slideNode) => {
  let text;
  for (const [node] of Node.texts(slideNode)) {
    text = text !== undefined ? `${text} ${node.text}` : node.text;
  }
  return text;
};

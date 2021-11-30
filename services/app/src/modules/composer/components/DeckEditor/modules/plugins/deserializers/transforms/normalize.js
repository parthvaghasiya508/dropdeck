import { Node } from "slate";
import { LIST_ITEM } from "../../component/list/type";
import { PARAGRAPH } from "../../component/paragraph/type";

export const normalize = (editor, nodes) => {
  const normalized = nodes.map((node) => {
    const { type } = node;
    if (!type || !typeIsAllowed(type)) {
      return {
        type: PARAGRAPH,
        children: [{ text: Node.string(node) }],
      };
    }
    return node;
  });
  return normalized;
};

// Only to filter out stray list items for now.
const typeIsAllowed = (type) => type && type !== LIST_ITEM;

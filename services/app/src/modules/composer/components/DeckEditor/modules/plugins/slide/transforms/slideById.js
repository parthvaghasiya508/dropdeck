import { SLIDE } from "../../component/slide/type";

export const slideById = (content, id) => {
  if (content && Array.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      const node = content[i];
      if (node.type === SLIDE && node.id && node.id === id) {
        return node;
      }
    }
  }
  return undefined;
};

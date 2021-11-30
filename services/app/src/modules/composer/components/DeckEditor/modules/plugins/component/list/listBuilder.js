import { LIST_ITEM } from "./type";
import { PARAGRAPH } from "../paragraph/type";

export const listBuilder = (type) => (...items) => {
  if (!items || items.length === 0) {
    items = [''];
  }
  return {
    type,
    children: items.map((item) => ({
      type: LIST_ITEM,
      children: [{
        type: PARAGRAPH,
        children: [{ text: item || '' }],
      }],
    }))
  };
};

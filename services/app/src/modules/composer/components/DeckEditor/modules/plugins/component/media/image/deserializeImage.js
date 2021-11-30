import { getElementDeserializer } from "@udecode/slate-plugins";
import { IMAGE } from "./type";
import { BLOCK_QUOTE } from "../../quote/type";

export const deserializeImage = ({
  typeImg = IMAGE,
} = {}) => ({
  element: getElementDeserializer(typeImg, {
    tagNames: ['IMG'],
    createElement: (el) => {

      const rawUrl = el.getAttribute('src');
      if (rawUrl && rawUrl.toLowerCase().startsWith("blob:")) {
        return;
      }

      const imageNode = {
        type: typeImg,
        settings: {
          url: el.getAttribute('src'),
          label: el.getAttribute('alt'),
        },
        children: [{ text: '' }],
      };

      const title = el.getAttribute('title');
      if (title) {
        const captionNode = {
          type: BLOCK_QUOTE,
          children: [{ text: title }],
        };
        return [imageNode, captionNode];
      }

      return imageNode;
    }
  }),
});

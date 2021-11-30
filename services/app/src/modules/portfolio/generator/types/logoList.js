import { LOGO_LIST } from "../../../composer/components/DeckEditor/modules/plugins/component/media/logoList/type";
import { LIST_ITEM } from "../../../composer/components/DeckEditor/modules/plugins/component/list/type";
import { PARAGRAPH } from "../../../composer/components/DeckEditor/modules/plugins/component/paragraph/type";

export const generateLogos = [
  {
    type: LOGO_LIST,
    children: [
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "" }],
          settings: {
            logo: {
              url: 'https://assets.brandfetch.io/33e43392b01840c.png',
            }
          },
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "" }],
          settings: {
            logo: {
              url: 'https://assets.brandfetch.io/0e2c3ba0c5c64f0.png',
            }
          },
        }]
      },
    ],
  },

];

import { LIST_ITEM } from "../../../composer/components/DeckEditor/modules/plugins/component/list/type";
import { PARAGRAPH } from "../../../composer/components/DeckEditor/modules/plugins/component/paragraph/type";

export const generateLists = (type) => [
  {
    type,
    children: [
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "Get some wood." }],
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "Hammer stuff together." }],
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "Add a roof." }],
        }]
      }
    ],
  },
  {
    type,
    children: [
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "Boil water." }],
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "Add bag of tea." }],
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: "Stir." }],
        }]
      }
    ],
  },
];

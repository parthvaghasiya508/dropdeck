import { BLOCK_QUOTE } from "../../../composer/components/DeckEditor/modules/plugins/component/quote/type";

export const generateQuotes = () => [
  {
    type: BLOCK_QUOTE,
    children: [{ text: 'I always wanted to get away from it all, you know?' }],
  },
  {
    type: BLOCK_QUOTE,
    children: [{ text: 'Sometimes I lose my keys and wander the streets for hours on end.' }],
  },
];

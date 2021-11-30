import { toHtml } from "./toHtml";
import { BLOCK_QUOTE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

const root = {
  children: [
    {
      type: PARAGRAPH,
      children: [
        { text: 'An opening paragraph.' },
      ],
    },
    {
      type: BLOCK_QUOTE,
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: PARAGRAPH,
      children: [{ text: 'A closing paragraph!' }],
    },
  ]
};
it('serializes to HTML', () => {
  expect(toHtml(root)).toEqual('<p>An opening paragraph.</p><blockquote><p>A wise quote.</p></blockquote><p>A closing paragraph!</p>');
});

import { generateSlides } from "./SlideFactory";
import { SLIDE } from "../../modules/composer/components/DeckEditor/modules/plugins/component/slide/type";

const content = [{
  type: SLIDE,
  id: 1,
  children: [
    {
      type: 'paragraph',
      children: [
        { text: 'An opening paragraph with a ' },
        {
          type: 'link',
          url: 'https://example.com',
          children: [{ text: 'link' }],
        },
        { text: ' in it.' },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'A closing paragraph!' }],
    },
    {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: 'List item 1' }],
        },
        {
          type: 'list-item',
          children: [{ text: 'List item 2' }],
        },
      ],
    }
  ]
}];

it('generates slides from a Deck', () => {

  const slides = generateSlides(content);
  expect(slides.length).toEqual(1);
  expect(slides[0].markup.length).toEqual(content[0].children.length);
});

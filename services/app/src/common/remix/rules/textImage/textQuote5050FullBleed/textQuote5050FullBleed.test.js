import { toSlide } from "../../../utils/testUtils";
import { textQuote5050FullBleedRemix } from "./textQuote5050FullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { BLOCK_QUOTE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";

it('should match a slide with image + quote followed by 2-4 images', () => {
  expect(textQuote5050FullBleedRemix.matches(toSlide(IMAGE, BLOCK_QUOTE, IMAGE))).toBeTruthy();
  expect(textQuote5050FullBleedRemix.matches(toSlide(IMAGE, BLOCK_QUOTE, IMAGE, IMAGE))).toBeTruthy();
});

it('should match label the image + quote pattern of a slide', () => {
  const [, labels] = textQuote5050FullBleedRemix.evaluate(toSlide(IMAGE, BLOCK_QUOTE, IMAGE, IMAGE));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(4);
  expect(labels['0']).toEqual("img-quote");
  expect(labels['1']).toEqual("img-quote");
  expect(labels['2']).toEqual("group-images");
  expect(labels['3']).toEqual("group-images");
});

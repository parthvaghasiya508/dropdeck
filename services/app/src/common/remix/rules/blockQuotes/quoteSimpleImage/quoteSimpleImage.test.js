import { toSlide } from "../../../utils/testUtils";
import { quoteSimpleImageRemix } from "./quoteSimpleImage";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { BLOCK_QUOTE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with a quote followed by an image', () => {
  expect(quoteSimpleImageRemix.matches(toSlide(BLOCK_QUOTE, IMAGE))).toBeTruthy();
  expect(quoteSimpleImageRemix.matches(toSlide(IMAGE))).toBeFalsy();
  expect(quoteSimpleImageRemix.matches(toSlide(BLOCK_QUOTE))).toBeTruthy();
});

it('should match a slide with an image followed by a quote and optional paragraph', () => {
  expect(quoteSimpleImageRemix.matches(toSlide(IMAGE, BLOCK_QUOTE))).toBeTruthy();
  expect(quoteSimpleImageRemix.matches(toSlide(IMAGE, BLOCK_QUOTE, PARAGRAPH))).toBeTruthy();
});

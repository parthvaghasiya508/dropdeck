import { toSlide } from "../../../utils/testUtils";
import { quoteParaColsRemix } from "./quoteParaCols";
import { BLOCK_QUOTE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";

it('should match a slide with up to 4 quotes', () => {
  expect(quoteParaColsRemix.matches(toSlide(BLOCK_QUOTE))).toBeFalsy();
  expect(quoteParaColsRemix.matches(toSlide(BLOCK_QUOTE, BLOCK_QUOTE))).toBeTruthy();
  expect(quoteParaColsRemix.matches(toSlide(BLOCK_QUOTE, BLOCK_QUOTE, BLOCK_QUOTE))).toBeTruthy();
  expect(quoteParaColsRemix.matches(toSlide(BLOCK_QUOTE, BLOCK_QUOTE, BLOCK_QUOTE, BLOCK_QUOTE))).toBeTruthy();
  expect(quoteParaColsRemix.matches(toSlide(BLOCK_QUOTE, BLOCK_QUOTE, BLOCK_QUOTE, BLOCK_QUOTE, BLOCK_QUOTE))).toBeFalsy();
});

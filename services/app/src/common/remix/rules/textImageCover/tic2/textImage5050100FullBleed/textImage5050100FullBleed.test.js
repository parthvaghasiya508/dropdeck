import { textImage5050100FullBleedRemix } from "./textImage5050100FullBleed";
import { toSlide } from "../../../../utils/testUtils";
import { IMAGE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BLOCK_QUOTE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with image and text', () => {
  expect(textImage5050100FullBleedRemix.matches(toSlide(HEADING_ONE, IMAGE))).toBeTruthy();
  expect(textImage5050100FullBleedRemix.matches(toSlide(HEADING_TWO, IMAGE))).toBeTruthy();
  expect(textImage5050100FullBleedRemix.matches(toSlide(BLOCK_QUOTE, IMAGE))).toBeTruthy();
  expect(textImage5050100FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(textImage5050100FullBleedRemix.matches(toSlide(IMAGE, PARAGRAPH))).toBeTruthy();
  expect(textImage5050100FullBleedRemix.matches(toSlide(IMAGE, HEADING_TWO))).toBeTruthy();
  expect(textImage5050100FullBleedRemix.matches(toSlide(IMAGE))).toBeFalsy();
});

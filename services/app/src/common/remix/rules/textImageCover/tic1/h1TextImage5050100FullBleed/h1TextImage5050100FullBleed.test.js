import { toSlide } from "../../../../utils/testUtils";
import { h1TextImage5050100FullBleedRemix } from "./h1TextImage5050100FullBleed";
import { IMAGE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with h1, plain text or h2 and an image', () => {
  expect(h1TextImage5050100FullBleedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(h1TextImage5050100FullBleedRemix.matches(toSlide(HEADING_ONE, HEADING_TWO, IMAGE))).toBeTruthy();
  expect(h1TextImage5050100FullBleedRemix.matches(toSlide(HEADING_ONE, IMAGE))).toBeFalsy();
  expect(h1TextImage5050100FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, IMAGE))).toBeFalsy();
  expect(h1TextImage5050100FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(h1TextImage5050100FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, HEADING_TWO))).toBeTruthy();
  expect(h1TextImage5050100FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE))).toBeFalsy();
});

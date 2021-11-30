import { toSlide, toSlideRelativeTo } from "../../../utils/testUtils";
import { textImage4x5050FullBleedRemix } from "./textImage4x5050FullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text followed by 4 images', () => {
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, IMAGE, IMAGE))).toBeTruthy();
});

it('should match a slide with 4 images object followed by text', () => {
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, IMAGE))).toBeFalsy();
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, IMAGE, HEADING_ONE))).toBeFalsy();
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_ONE))).toBeTruthy();
});

it('should match a slide with 4 image(s) + clusters', () => {
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, IMAGE))).toBeFalsy();
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(textImage4x5050FullBleedRemix.matches(toSlideRelativeTo(textImage4x5050FullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeFalsy();
});

import { toSlideRelativeTo } from "../../../../../utils/testUtils";
import { textImages2575FullBleedRemix } from "./textImages2575FullBleed";
import { IMAGE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 1-4 images', () => {
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, IMAGE, IMAGE, PARAGRAPH, IMAGE, HEADING_TWO))).toBeTruthy();
});

it('should match a slide with image(s) + clustered text content', () => {
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, IMAGE, IMAGE, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textImages2575FullBleedRemix.matches(toSlideRelativeTo(textImages2575FullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
});

import { toSlide, toSlideRelativeTo } from "../../../utils/testUtils";
import { textImage5050AspectRemix } from "./textImage5050Aspect";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { VIDEO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text followed by one media object', () => {
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, HEADING_ONE, PARAGRAPH, VIDEO))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, HEADING_ONE, PARAGRAPH, LOGO))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, LOGO))).toBeFalsy();
});

it('should match a slide with one media object followed by text', () => {
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, IMAGE))).toBeFalsy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, IMAGE, HEADING_ONE))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, VIDEO, HEADING_ONE))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, LOGO, HEADING_ONE))).toBeTruthy();
});

it('should match a slide with image(s) + clustered text content', () => {
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, IMAGE, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, IMAGE, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(textImage5050AspectRemix.matches(toSlideRelativeTo(textImage5050AspectRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

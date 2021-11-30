import { toSlide } from "../../../utils/testUtils";
import { imageWindowedRemix } from "./imageWindowed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and one image', () => {
  expect(imageWindowedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(imageWindowedRemix.matches(toSlide(IMAGE))).toBeTruthy();
  expect(imageWindowedRemix.matches(toSlide(PARAGRAPH, IMAGE, PARAGRAPH))).toBeTruthy();
  expect(imageWindowedRemix.matches(toSlide(PARAGRAPH, LOGO, PARAGRAPH))).toBeFalsy();
  expect(imageWindowedRemix.matches(toSlide(PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
});

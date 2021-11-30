import { toSlideRelativeTo } from "../../../utils/testUtils";
import { logoTextImage5050FullBleedRemix } from "./logoTextImage5050FullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text, 1-4 images and a number of logos', () => {
  expect(logoTextImage5050FullBleedRemix.matches(toSlideRelativeTo(logoTextImage5050FullBleedRemix, HEADING_ONE, PARAGRAPH, LOGO))).toBeFalsy();
  expect(logoTextImage5050FullBleedRemix.matches(toSlideRelativeTo(logoTextImage5050FullBleedRemix, LOGO, HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(logoTextImage5050FullBleedRemix.matches(toSlideRelativeTo(logoTextImage5050FullBleedRemix, LOGO, HEADING_ONE, IMAGE, LOGO))).toBeFalsy();
  expect(logoTextImage5050FullBleedRemix.matches(toSlideRelativeTo(logoTextImage5050FullBleedRemix, LOGO, LOGO, HEADING_ONE, IMAGE))).toBeFalsy();
});

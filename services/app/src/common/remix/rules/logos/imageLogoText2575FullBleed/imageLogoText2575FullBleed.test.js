import { toSlide, toSlideRelativeTo } from "../../../utils/testUtils";
import { imageLogoText2575FullBleedRemix } from "./imageLogoText2575FullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text, 1-4 images and a number of logos', () => {
  expect(imageLogoText2575FullBleedRemix.matches(toSlideRelativeTo(imageLogoText2575FullBleedRemix, HEADING_ONE, PARAGRAPH, LOGO))).toBeFalsy();
  expect(imageLogoText2575FullBleedRemix.matches(toSlideRelativeTo(imageLogoText2575FullBleedRemix, LOGO, HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(imageLogoText2575FullBleedRemix.matches(toSlideRelativeTo(imageLogoText2575FullBleedRemix, LOGO, HEADING_ONE, IMAGE, LOGO))).toBeFalsy();
  expect(imageLogoText2575FullBleedRemix.matches(toSlideRelativeTo(imageLogoText2575FullBleedRemix, LOGO, LOGO, HEADING_ONE, IMAGE))).toBeFalsy();
});

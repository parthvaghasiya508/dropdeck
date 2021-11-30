import { toSlideRelativeTo } from "../../../utils/testUtils";
import { imageFullBleedTextGradientRemix } from "./imageFullBleedTextGradientRemix";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";

it('should match a slide with text or list and one image', () => {
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, HEADING_ONE, NUMBERED_LIST, IMAGE))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, IMAGE))).toBeFalsy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, IMAGE, PARAGRAPH))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, HEADING_ONE, IMAGE, PARAGRAPH))).toBeTruthy();

  // Logos
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, HEADING_ONE, IMAGE, LOGO))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, IMAGE, HEADING_ONE, LOGO))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, HEADING_ONE, IMAGE, LOGO, PARAGRAPH))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, IMAGE, LOGO, PARAGRAPH))).toBeTruthy();
  expect(imageFullBleedTextGradientRemix.matches(toSlideRelativeTo(imageFullBleedTextGradientRemix, IMAGE, LOGO))).toBeFalsy();

});

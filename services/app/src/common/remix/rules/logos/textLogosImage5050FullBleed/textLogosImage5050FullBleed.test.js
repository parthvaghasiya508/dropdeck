import { toSlideRelativeTo } from "../../../utils/testUtils";
import { MAX_LOGOS, textLogosImage5050FullBleedRemix } from "./textLogosImage5050FullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text, 1-4 images and a number of logos', () => {
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, HEADING_ONE, PARAGRAPH, LOGO))).toBeFalsy();
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, LOGO))).toBeTruthy();
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, HEADING_ONE, IMAGE, LOGO))).toBeTruthy();
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, LOGO, IMAGE))).toBeFalsy();
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, HEADING_ONE, PARAGRAPH, LOGO, LOGO, IMAGE))).toBeTruthy();
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, LOGO, LOGO))).toBeTruthy();
});

it('should not match a slide with more than the max number of logos', () => {
  const maxLogos = [HEADING_ONE, IMAGE];
  for (let i = 0; i < MAX_LOGOS; i++) {
    maxLogos.push(LOGO);
  }
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, ...maxLogos))).toBeTruthy();
  expect(textLogosImage5050FullBleedRemix.matches(toSlideRelativeTo(textLogosImage5050FullBleedRemix, ...maxLogos, LOGO))).toBeFalsy();
});

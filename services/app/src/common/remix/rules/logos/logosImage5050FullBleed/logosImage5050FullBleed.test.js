import { toSlide } from "../../../utils/testUtils";
import { logosImage5050FullBleedRemix, MAX_LOGOS } from "./logosImage5050FullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with 1-4 images and a number of logos', () => {
  expect(logosImage5050FullBleedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, LOGO))).toBeFalsy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(IMAGE, LOGO))).toBeTruthy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(HEADING_ONE, IMAGE, LOGO))).toBeFalsy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(IMAGE, LOGO, IMAGE))).toBeFalsy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(LOGO, LOGO, IMAGE))).toBeTruthy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(IMAGE, IMAGE, LOGO, LOGO))).toBeTruthy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(IMAGE))).toBeFalsy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(LOGO))).toBeFalsy();

});

it('should not match a slide with more than the max number of logos', () => {
  const maxLogos = [IMAGE, IMAGE, IMAGE, IMAGE];
  for (let i = 0; i < MAX_LOGOS; i++) {
    maxLogos.push(LOGO);
  }
  expect(logosImage5050FullBleedRemix.matches(toSlide(...maxLogos))).toBeTruthy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(...maxLogos, LOGO))).toBeFalsy();
  expect(logosImage5050FullBleedRemix.matches(toSlide(IMAGE, ...maxLogos))).toBeFalsy();
});

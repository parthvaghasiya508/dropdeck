import { toSlide } from "../../../../utils/testUtils";
import { imageH1Text1005050FullBleedRemix } from "./imageH1Text1005050FullBleed";
import { IMAGE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with image, h1, plain text or h2', () => {
  expect(imageH1Text1005050FullBleedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(imageH1Text1005050FullBleedRemix.matches(toSlide(HEADING_ONE, HEADING_TWO, IMAGE))).toBeTruthy();
  expect(imageH1Text1005050FullBleedRemix.matches(toSlide(HEADING_ONE, IMAGE))).toBeFalsy();
  expect(imageH1Text1005050FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, IMAGE))).toBeFalsy();
  expect(imageH1Text1005050FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(imageH1Text1005050FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, HEADING_TWO))).toBeTruthy();
  expect(imageH1Text1005050FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE))).toBeFalsy();
});

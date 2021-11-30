import { toSlide } from "../../../../utils/testUtils";

import { imageText1005050FullBleedRemix } from "./imageText1005050FullBleed";
import { IMAGE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BLOCK_QUOTE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with image and text', () => {
  expect(imageText1005050FullBleedRemix.matches(toSlide(HEADING_ONE, IMAGE))).toBeTruthy();
  expect(imageText1005050FullBleedRemix.matches(toSlide(HEADING_TWO, IMAGE))).toBeTruthy();
  expect(imageText1005050FullBleedRemix.matches(toSlide(BLOCK_QUOTE, IMAGE))).toBeTruthy();
  expect(imageText1005050FullBleedRemix.matches(toSlide(IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(imageText1005050FullBleedRemix.matches(toSlide(IMAGE, PARAGRAPH))).toBeTruthy();
  expect(imageText1005050FullBleedRemix.matches(toSlide(IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imageText1005050FullBleedRemix.matches(toSlide(IMAGE))).toBeFalsy();
});

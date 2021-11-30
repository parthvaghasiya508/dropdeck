import { toSlide } from "../../../utils/testUtils";
import { imagesFullBleedRemix } from "./imagesFullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 2-4 images', () => {
  expect(imagesFullBleedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeTruthy();
  expect(imagesFullBleedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imagesFullBleedRemix.matches(toSlide(IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imagesFullBleedRemix.matches(toSlide(IMAGE, IMAGE, PARAGRAPH, IMAGE, HEADING_TWO))).toBeFalsy();
});

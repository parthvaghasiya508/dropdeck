import { toSlide } from "../../../utils/testUtils";
import { imagesQuadWindowedRemix } from "./imagesQuadWindowedRemix";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 4 images', () => {
  expect(imagesQuadWindowedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
  expect(imagesQuadWindowedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(imagesQuadWindowedRemix.matches(toSlide(IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(imagesQuadWindowedRemix.matches(toSlide(IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imagesQuadWindowedRemix.matches(toSlide(HEADING_TWO, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
});

import { toSlide } from "../../../utils/testUtils";
import { imagesQuadAspect } from "./imagesQuadAspect";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 4 images', () => {
  expect(imagesQuadAspect.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
  expect(imagesQuadAspect.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(imagesQuadAspect.matches(toSlide(IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(imagesQuadAspect.matches(toSlide(IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imagesQuadAspect.matches(toSlide(HEADING_TWO, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
});

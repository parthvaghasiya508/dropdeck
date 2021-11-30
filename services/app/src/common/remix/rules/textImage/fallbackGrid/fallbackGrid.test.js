import { toSlide } from "../../../utils/testUtils";
import { fallbackGridRemix } from "./fallbackGrid";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with between 2-12 elements', () => {
  expect(fallbackGridRemix.matches(toSlide(HEADING_ONE))).toBeFalsy();
  expect(fallbackGridRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeTruthy();
  expect(fallbackGridRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(fallbackGridRemix.matches(toSlide(IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(fallbackGridRemix.matches(toSlide(IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(fallbackGridRemix.matches(toSlide(HEADING_TWO, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
});

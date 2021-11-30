import { textLongformRemix } from "./textLongform";
import { toSlide } from "../../../utils/testUtils";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { CHART } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/type";

it('should match a slide with any text, including clusters', () => {
  expect(textLongformRemix.matches(toSlide(HEADING_ONE))).toBeFalsy();
  expect(textLongformRemix.matches(toSlide(HEADING_TWO))).toBeFalsy();
  expect(textLongformRemix.matches(toSlide(PARAGRAPH))).toBeFalsy();
  expect(textLongformRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, PARAGRAPH))).toBeTruthy();
  expect(textLongformRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(textLongformRemix.matches(toSlide(HEADING_ONE, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(textLongformRemix.matches(toSlide(HEADING_ONE, HEADING_TWO, CHART))).toBeFalsy();
  expect(textLongformRemix.matches(toSlide(IMAGE, HEADING_ONE, HEADING_TWO))).toBeFalsy();
  expect(textLongformRemix.matches(toSlide(HEADING_ONE, CHART))).toBeFalsy();
  expect(textLongformRemix.matches(toSlide(HEADING_ONE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(textLongformRemix.matches(toSlide(CHART))).toBeFalsy();
});

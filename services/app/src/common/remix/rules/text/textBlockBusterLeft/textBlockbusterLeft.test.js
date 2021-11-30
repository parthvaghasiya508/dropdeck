import { toSlide } from "../../../utils/testUtils";
import { textBlockbusterLeftRemix } from "./textBlockbusterLeft";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with any number of headings', () => {
  expect(textBlockbusterLeftRemix.matches(toSlide(HEADING_ONE))).toBeTruthy();
  expect(textBlockbusterLeftRemix.matches(toSlide(HEADING_TWO))).toBeTruthy();
  expect(textBlockbusterLeftRemix.matches(toSlide(HEADING_ONE, HEADING_ONE))).toBeTruthy();
  expect(textBlockbusterLeftRemix.matches(toSlide(HEADING_ONE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textBlockbusterLeftRemix.matches(toSlide())).toBeFalsy();
});

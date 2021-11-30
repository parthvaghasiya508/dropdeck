import { toSlide } from "../../../utils/testUtils";
import { textBlockbusterRemix } from "./textBlockbuster";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with any number of headings', () => {
  expect(textBlockbusterRemix.matches(toSlide(HEADING_ONE))).toBeTruthy();
  expect(textBlockbusterRemix.matches(toSlide(HEADING_TWO))).toBeTruthy();
  expect(textBlockbusterRemix.matches(toSlide(HEADING_ONE, HEADING_ONE))).toBeTruthy();
  expect(textBlockbusterRemix.matches(toSlide(HEADING_ONE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textBlockbusterRemix.matches(toSlide())).toBeFalsy();
});

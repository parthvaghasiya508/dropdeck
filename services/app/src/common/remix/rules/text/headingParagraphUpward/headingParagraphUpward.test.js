import { toSlide } from "../../../utils/testUtils";
import { headingParagraphUpwardRemix } from "./headingParagraphUpward";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with any number of headings followed by at least one paragraph', () => {
  expect(headingParagraphUpwardRemix.matches(toSlide(HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(headingParagraphUpwardRemix.matches(toSlide(HEADING_ONE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(headingParagraphUpwardRemix.matches(toSlide(HEADING_TWO, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(headingParagraphUpwardRemix.matches(toSlide(HEADING_TWO, HEADING_ONE))).toBeFalsy();
});

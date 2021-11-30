import { toSlide } from "../../../utils/testUtils";
import { textHeadingColsRemix } from "./textHeadingCols";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";

it('should match a slide with a sequence of headings', () => {
  expect(textHeadingColsRemix.matches(toSlide(HEADING_ONE))).toBeFalsy();
  expect(textHeadingColsRemix.matches(toSlide(HEADING_TWO))).toBeFalsy();
  expect(textHeadingColsRemix.matches(toSlide(HEADING_ONE, HEADING_ONE))).toBeTruthy();
  expect(textHeadingColsRemix.matches(toSlide(HEADING_TWO, HEADING_TWO))).toBeTruthy();
  expect(textHeadingColsRemix.matches(toSlide(HEADING_ONE, HEADING_TWO))).toBeFalsy();
  expect(textHeadingColsRemix.matches(toSlide(HEADING_TWO, HEADING_ONE))).toBeFalsy();
  expect(textHeadingColsRemix.matches(toSlide(HEADING_TWO, HEADING_ONE, HEADING_ONE))).toBeFalsy();
});

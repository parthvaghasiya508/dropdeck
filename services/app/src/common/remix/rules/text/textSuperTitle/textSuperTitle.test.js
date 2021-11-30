import { toSlide } from "../../../utils/testUtils";
import { textSuperTitleRemix } from "./textSuperTitle";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with one or two headings only', () => {
  expect(textSuperTitleRemix.matches(toSlide(HEADING_ONE))).toBeTruthy();
  expect(textSuperTitleRemix.matches(toSlide(HEADING_TWO))).toBeTruthy();
  expect(textSuperTitleRemix.matches(toSlide(HEADING_ONE, HEADING_ONE))).toBeTruthy();
  expect(textSuperTitleRemix.matches(toSlide(HEADING_ONE, HEADING_TWO))).toBeTruthy();
  expect(textSuperTitleRemix.matches(toSlide(HEADING_ONE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
});

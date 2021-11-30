import { toSlide } from "../../../utils/testUtils";
import { textCodeColumnsRemix } from "./textCodeColumns";
import { CODE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/code/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with any number of text elements followed by a code block', () => {
  expect(textCodeColumnsRemix.matches(toSlide(PARAGRAPH))).toBeFalsy();
  expect(textCodeColumnsRemix.matches(toSlide(PARAGRAPH, CODE))).toBeTruthy();
  expect(textCodeColumnsRemix.matches(toSlide(PARAGRAPH, CODE, CODE))).toBeTruthy();
  expect(textCodeColumnsRemix.matches(toSlide(CODE, PARAGRAPH))).toBeTruthy();
});

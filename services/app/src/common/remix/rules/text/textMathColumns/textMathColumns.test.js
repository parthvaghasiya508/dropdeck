import { toSlide } from "../../../utils/testUtils";
import { textMathColumnsRemix } from "./textMathColumns";
import { MATH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/math/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with any number of text elements followed by a math block', () => {
  expect(textMathColumnsRemix.matches(toSlide(PARAGRAPH))).toBeFalsy();
  expect(textMathColumnsRemix.matches(toSlide(PARAGRAPH, MATH))).toBeTruthy();
  expect(textMathColumnsRemix.matches(toSlide(PARAGRAPH, MATH, MATH))).toBeTruthy();
  expect(textMathColumnsRemix.matches(toSlide(MATH, PARAGRAPH))).toBeTruthy();
});

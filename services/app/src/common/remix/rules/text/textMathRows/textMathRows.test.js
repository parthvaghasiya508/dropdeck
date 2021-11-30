import { toSlide } from "../../../utils/testUtils";
import { textMathRowsRemix } from "./textMathRows";
import { MATH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/math/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with any number of text elements followed by a math block', () => {
  expect(textMathRowsRemix.matches(toSlide(PARAGRAPH, MATH, MATH))).toBeFalsy();

  const [, labels] = textMathRowsRemix.evaluate(toSlide(HEADING_ONE, PARAGRAPH, MATH));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['0']).toEqual("text-wrap-before");
  expect(labels['1']).toEqual("text-wrap-before");
});

it('should match a slide with a math block followed by any number of text elements', () => {
  expect(textMathRowsRemix.matches(toSlide(MATH, PARAGRAPH))).toBeTruthy();
  const [, labels] = textMathRowsRemix.evaluate(toSlide(MATH, HEADING_ONE, PARAGRAPH));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['1']).toEqual("text-wrap-after");
  expect(labels['2']).toEqual("text-wrap-after");
});

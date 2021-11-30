import { toSlide } from "../../../utils/testUtils";
import { textCodeRowsRemix } from "./textCodeRows";
import { CODE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/code/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with any number of text elements followed by a code block', () => {
  // expect(textCodeRowsRemix.matches(toSlide(PARAGRAPH))).toBeFalsy();
  // expect(textCodeRowsRemix.matches(toSlide(PARAGRAPH, CODE))).toBeTruthy();
  expect(textCodeRowsRemix.matches(toSlide(PARAGRAPH, CODE, CODE))).toBeFalsy();

  const [, labels] = textCodeRowsRemix.evaluate(toSlide(HEADING_ONE, PARAGRAPH, CODE));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['0']).toEqual("text-wrap-before");
  expect(labels['1']).toEqual("text-wrap-before");
});

it('should match a slide with a code block followed by any number of text elements', () => {
  expect(textCodeRowsRemix.matches(toSlide(CODE, PARAGRAPH))).toBeTruthy();
  const [, labels] = textCodeRowsRemix.evaluate(toSlide(CODE, HEADING_ONE, PARAGRAPH));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['1']).toEqual("text-wrap-after");
  expect(labels['2']).toEqual("text-wrap-after");
});

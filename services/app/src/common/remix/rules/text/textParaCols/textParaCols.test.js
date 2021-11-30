import { toSlide } from "../../../utils/testUtils";
import { textParaColsRemix } from "./textParaCols";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with a sequence of paragraphs, with or without heading', () => {
  expect(textParaColsRemix.matches(toSlide(PARAGRAPH))).toBeFalsy();
  expect(textParaColsRemix.matches(toSlide(PARAGRAPH, PARAGRAPH))).toBeTruthy();
  expect(textParaColsRemix.matches(toSlide(PARAGRAPH, PARAGRAPH, PARAGRAPH))).toBeTruthy();
  expect(textParaColsRemix.matches(toSlide(PARAGRAPH, PARAGRAPH, PARAGRAPH, PARAGRAPH))).toBeTruthy();
  expect(textParaColsRemix.matches(toSlide(PARAGRAPH, PARAGRAPH, PARAGRAPH, PARAGRAPH, PARAGRAPH))).toBeFalsy();

  expect(textParaColsRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, PARAGRAPH))).toBeTruthy();
});

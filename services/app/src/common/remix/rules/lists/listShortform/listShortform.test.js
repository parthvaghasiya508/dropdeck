import { toSlide } from "../../../utils/testUtils";
import { listShortformRemix } from "./listShortform";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { BULLETED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text followed by a numbered list', () => {
  expect(listShortformRemix.matches(toSlide(HEADING_ONE, NUMBERED_LIST))).toBeTruthy();
  expect(listShortformRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, NUMBERED_LIST))).toBeTruthy();
  expect(listShortformRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, NUMBERED_LIST, NUMBERED_LIST))).toBeFalsy();
  expect(listShortformRemix.matches(toSlide(NUMBERED_LIST))).toBeTruthy();
});

it('should apply labels to the text portion of a slide', () => {
  const [, labels] = listShortformRemix.evaluate(toSlide(HEADING_ONE, PARAGRAPH, NUMBERED_LIST));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['0']).toEqual("group-text-before");
  expect(labels['1']).toEqual("group-text-before");
});

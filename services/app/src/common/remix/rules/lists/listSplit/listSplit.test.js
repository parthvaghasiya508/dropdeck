import { toSlide } from "../../../utils/testUtils";
import { listSplitRemix } from "./listSplit";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { BULLETED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text and a single list', () => {
  expect(listSplitRemix.matches(toSlide(HEADING_ONE, BULLETED_LIST))).toBeTruthy();
  expect(listSplitRemix.matches(toSlide(HEADING_ONE, BULLETED_LIST, PARAGRAPH))).toBeTruthy();
  expect(listSplitRemix.matches(toSlide(NUMBERED_LIST, PARAGRAPH))).toBeTruthy();
  expect(listSplitRemix.matches(toSlide(NUMBERED_LIST))).toBeTruthy();
  expect(listSplitRemix.matches(toSlide(NUMBERED_LIST, PARAGRAPH, BULLETED_LIST))).toBeFalsy();
});

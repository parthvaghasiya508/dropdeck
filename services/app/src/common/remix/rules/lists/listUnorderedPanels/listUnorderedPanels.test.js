import { toSlide } from "../../../utils/testUtils";
import { listUnorderedPanelsRemix } from "./listUnorderedPanels";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { BULLETED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text and some number of lists', () => {
  expect(listUnorderedPanelsRemix.matches(toSlide(HEADING_ONE, BULLETED_LIST))).toBeTruthy();
  expect(listUnorderedPanelsRemix.matches(toSlide(HEADING_ONE, BULLETED_LIST, BULLETED_LIST))).toBeTruthy();
  expect(listUnorderedPanelsRemix.matches(toSlide(HEADING_ONE, BULLETED_LIST, BULLETED_LIST, PARAGRAPH))).toBeTruthy();
  expect(listUnorderedPanelsRemix.matches(toSlide(HEADING_ONE, BULLETED_LIST, BULLETED_LIST, PARAGRAPH, BULLETED_LIST))).toBeFalsy();
  expect(listUnorderedPanelsRemix.matches(toSlide(BULLETED_LIST))).toBeTruthy();
  expect(listUnorderedPanelsRemix.matches(toSlide(NUMBERED_LIST))).toBeTruthy();
});

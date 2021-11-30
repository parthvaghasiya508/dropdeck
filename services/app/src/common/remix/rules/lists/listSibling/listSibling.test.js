import { toSlide } from "../../../utils/testUtils";
import { listSplitRemix } from "../listSplit/listSplit";
import { listSiblingRemix } from "./listSibling";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { BULLETED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with at least 2 lists', () => {
  expect(listSiblingRemix.matches(toSlide(NUMBERED_LIST))).toBeFalsy();
  expect(listSiblingRemix.matches(toSlide(NUMBERED_LIST, BULLETED_LIST))).toBeFalsy();
  expect(listSiblingRemix.matches(toSlide(NUMBERED_LIST, BULLETED_LIST, PARAGRAPH))).toBeFalsy();
});

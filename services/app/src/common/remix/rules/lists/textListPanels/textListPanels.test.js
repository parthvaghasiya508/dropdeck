import { toSlide } from "../../../utils/testUtils";
import { listSplitRemix } from "../listSplit/listSplit";
import { listSiblingRemix } from "../listSibling/listSibling";
import { textListPanelsRemix } from "./textListPanels";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text + image followed by one or more lists', () => {
  expect(textListPanelsRemix.matches(toSlide(HEADING_ONE, NUMBERED_LIST))).toBeFalsy();
  expect(textListPanelsRemix.matches(toSlide(HEADING_ONE, HEADING_TWO, BULLETED_LIST))).toBeFalsy();
  expect(textListPanelsRemix.matches(toSlide(IMAGE, HEADING_TWO, PARAGRAPH, BULLETED_LIST))).toBeTruthy();
  expect(textListPanelsRemix.matches(toSlide(NUMBERED_LIST))).toBeFalsy();
});

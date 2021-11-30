import { toSlide } from "../../../utils/testUtils";
import { listSplitRemix } from "../listSplit/listSplit";
import { listSiblingRemix } from "../listSibling/listSibling";
import { textListCenteredRemix } from "./textListCentered";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { BULLETED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text followed by one or more lists', () => {
  expect(textListCenteredRemix.matches(toSlide(HEADING_ONE, NUMBERED_LIST))).toBeTruthy();
  expect(textListCenteredRemix.matches(toSlide(HEADING_ONE, NUMBERED_LIST, PARAGRAPH))).toBeFalsy();
});

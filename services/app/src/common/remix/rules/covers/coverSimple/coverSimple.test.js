import { HEADING_ONE } from "modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { toSlide } from "../../../utils/testUtils";
import { coverSimpleRemix } from "./coverSimple";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { BLOCK_QUOTE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with a quote followed by an image', () => {
  expect(coverSimpleRemix.matches(toSlide(BLOCK_QUOTE, IMAGE))).toBeFalsy();
  expect(coverSimpleRemix.matches(toSlide(IMAGE))).toBeFalsy();
  expect(coverSimpleRemix.matches(toSlide(HEADING_TWO, NUMBERED_LIST))).toBeFalsy();
});

it('should match a slide with an image followed by a quote and optional paragraph', () => {
  expect(coverSimpleRemix.matches(toSlide(IMAGE, HEADING_ONE, HEADING_TWO))).toBeTruthy();
  expect(coverSimpleRemix.matches(toSlide(IMAGE, HEADING_ONE, HEADING_TWO, BULLETED_LIST))).toBeTruthy();
});

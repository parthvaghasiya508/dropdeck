import { toSlide } from "../../../utils/testUtils";
import { clustersQuoteRoundedImageRemix } from "./clustersQuoteRoundImage";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { BLOCK_QUOTE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should not match anything as match conditions have been currently removed', () => {
  expect(clustersQuoteRoundedImageRemix.matches(toSlide(HEADING_ONE, BLOCK_QUOTE, IMAGE, BLOCK_QUOTE, IMAGE))).toBeFalsy();
  expect(clustersQuoteRoundedImageRemix.matches(toSlide(IMAGE, BLOCK_QUOTE, IMAGE, BLOCK_QUOTE))).toBeFalsy();
  expect(clustersQuoteRoundedImageRemix.matches(toSlide(IMAGE, BLOCK_QUOTE, PARAGRAPH, IMAGE, BLOCK_QUOTE))).toBeFalsy();
});

import { boxOutTextLeftRemix } from "./containedCover";
import { toSlide } from "../../utils/testUtils";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and one image', () => {
  expect(boxOutTextLeftRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(boxOutTextLeftRemix.matches(toSlide(IMAGE))).toBeFalsy();
  expect(boxOutTextLeftRemix.matches(toSlide(PARAGRAPH, IMAGE))).toBeTruthy();
  expect(boxOutTextLeftRemix.matches(toSlide(PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
});

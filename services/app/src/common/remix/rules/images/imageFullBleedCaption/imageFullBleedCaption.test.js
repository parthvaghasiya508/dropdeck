import { toSlide } from "../../../utils/testUtils";
import { imageFullBleedCaptionRemix } from "./imageFullBleedCaption";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a single image followed by one or more paragraphs', () => {
  expect(imageFullBleedCaptionRemix.matches(toSlide(IMAGE))).toBeFalsy();
  expect(imageFullBleedCaptionRemix.matches(toSlide(IMAGE, PARAGRAPH))).toBeTruthy();
  expect(imageFullBleedCaptionRemix.matches(toSlide(PARAGRAPH, IMAGE))).toBeFalsy();
  expect(imageFullBleedCaptionRemix.matches(toSlide(IMAGE, IMAGE))).toBeFalsy();
});

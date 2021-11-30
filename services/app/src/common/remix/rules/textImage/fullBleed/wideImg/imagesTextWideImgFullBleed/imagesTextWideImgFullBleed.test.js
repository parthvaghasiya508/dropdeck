import { toSlide, toSlideRelativeTo } from "../../../../../utils/testUtils";
import { imagesTextWideImgFullBleedRemix } from "./imagesTextWideImgFullBleed";
import { IMAGE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 1-4 images', () => {
  const remix = imagesTextWideImgFullBleedRemix;
  const fallback = imagesTextWideImgFullBleedRemix.next();

  expect(remix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeTruthy();

  expect(remix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(fallback.matches(toSlideRelativeTo(fallback, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();

  expect(remix.matches(toSlide(IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(fallback.matches(toSlide(IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();

  expect(remix.matches(toSlide(IMAGE, IMAGE, PARAGRAPH, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(fallback.matches(toSlideRelativeTo(fallback, IMAGE, IMAGE, PARAGRAPH, IMAGE, HEADING_TWO))).toBeTruthy();
});

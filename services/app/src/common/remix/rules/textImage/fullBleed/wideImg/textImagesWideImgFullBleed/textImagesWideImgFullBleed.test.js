import { toSlide, toSlideRelativeTo } from "../../../../../utils/testUtils";
import { textImagesWideImgFullBleedRemix } from "./textImagesWideImgFullBleed";
import { IMAGE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 1-4 images', () => {
  const fallback = textImagesWideImgFullBleedRemix.next();
  expect(textImagesWideImgFullBleedRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(textImagesWideImgFullBleedRemix.matches(toSlide(IMAGE, IMAGE, PARAGRAPH, IMAGE, HEADING_TWO))).toBeFalsy();
});

it('should match a slide with image(s) + clustered text content', () => {
  const fallback = textImagesWideImgFullBleedRemix.next();
  expect(fallback.matches(toSlideRelativeTo(fallback, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(fallback.matches(toSlideRelativeTo(fallback, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textImagesWideImgFullBleedRemix.matches(toSlideRelativeTo(textImagesWideImgFullBleedRemix, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, HEADING_TWO, PARAGRAPH, IMAGE, IMAGE, IMAGE, IMAGE))).toBeTruthy();
  expect(textImagesWideImgFullBleedRemix.matches(toSlideRelativeTo(textImagesWideImgFullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(textImagesWideImgFullBleedRemix.matches(toSlideRelativeTo(textImagesWideImgFullBleedRemix, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

it('should group prefix and image group', () => {
  expect(textImagesWideImgFullBleedRemix.matches(toSlide(IMAGE, IMAGE, PARAGRAPH, IMAGE, IMAGE, IMAGE))).toBeTruthy();
});

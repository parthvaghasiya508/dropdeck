import { toSlide } from "../../../utils/testUtils";
import { clustersTextFixedImageAspectRemix } from "./clustersTextFixedImageAspect";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with two or more clusters', () => {
  expect(clustersTextFixedImageAspectRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(clustersTextFixedImageAspectRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(clustersTextFixedImageAspectRemix.matches(toSlide(IMAGE, PARAGRAPH, IMAGE, PARAGRAPH))).toBeTruthy();
  expect(clustersTextFixedImageAspectRemix.matches(toSlide(PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(clustersTextFixedImageAspectRemix.matches(toSlide(IMAGE, HEADING_ONE, IMAGE, HEADING_ONE, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersTextFixedImageAspectRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeFalsy();
  expect(clustersTextFixedImageAspectRemix.matches(toSlide(HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

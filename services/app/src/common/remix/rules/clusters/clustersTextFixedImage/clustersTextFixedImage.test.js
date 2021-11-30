import { toSlide } from "../../../utils/testUtils";
import { clustersTextFixedImageRemix } from "./clustersTextFixedImage";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with two or more clusters', () => {
  expect(clustersTextFixedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersTextFixedImageRemix.matches(toSlide(PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersTextFixedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeFalsy();
  expect(clustersTextFixedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

import { toSlide } from "../../../utils/testUtils";
import { clustersRoundedImageRemix } from "./clustersRoundedImage";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with two or more clusters', () => {
  expect(clustersRoundedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(clustersRoundedImageRemix.matches(toSlide(IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersRoundedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeFalsy();
  expect(clustersRoundedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

import { toSlide } from "../../../utils/testUtils";
import { clustersPanelFixedImageRemix } from "./clustersPanelFixedImage";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with two or more clusters', () => {
  expect(clustersPanelFixedImageRemix.matches(toSlide(HEADING_ONE, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersPanelFixedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeTruthy();
  expect(clustersPanelFixedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeFalsy();
  expect(clustersPanelFixedImageRemix.matches(toSlide(HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

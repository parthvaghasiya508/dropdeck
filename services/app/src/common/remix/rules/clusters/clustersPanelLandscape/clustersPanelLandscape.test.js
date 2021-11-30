import { toSlide } from "../../../utils/testUtils";
import { clustersPanelLandscapeRemix } from "./clustersPanelLandscape";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with two or more clusters when image present', () => {
  expect(clustersPanelLandscapeRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(clustersPanelLandscapeRemix.matches(toSlide(IMAGE, HEADING_ONE, PARAGRAPH, IMAGE, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersPanelLandscapeRemix.matches(toSlide(PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(clustersPanelLandscapeRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeFalsy();
  expect(clustersPanelLandscapeRemix.matches(toSlide(HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

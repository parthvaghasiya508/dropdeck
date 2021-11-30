import { toSlide } from "../../../utils/testUtils";
import { clustersText5050Remix } from "./clustersText5050";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with two or more clusters', () => {
  expect(clustersText5050Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersText5050Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeFalsy();
  expect(clustersText5050Remix.matches(toSlide(PARAGRAPH, HEADING_ONE, PARAGRAPH, PARAGRAPH, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(clustersText5050Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE))).toBeFalsy();
  expect(clustersText5050Remix.matches(toSlide(HEADING_ONE, PARAGRAPH))).toBeFalsy();
});

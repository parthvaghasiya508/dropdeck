import { toSlide } from "../../../utils/testUtils";
import { textChartColumnRemix } from "./textChartColumns";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { CHART } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/type";

it('should match a slide with any number of text elements followed by a single chart', () => {
  expect(textChartColumnRemix.matches(toSlide(HEADING_ONE, CHART))).toBeTruthy();
  expect(textChartColumnRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, CHART))).toBeTruthy();
  expect(textChartColumnRemix.matches(toSlide(PARAGRAPH))).toBeFalsy();
});

it('should match a slide with a chart followed by any number of text elements', () => {
  expect(textChartColumnRemix.matches(toSlide(CHART, HEADING_ONE))).toBeTruthy();
  expect(textChartColumnRemix.matches(toSlide(CHART, HEADING_ONE, PARAGRAPH))).toBeTruthy();
  expect(textChartColumnRemix.matches(toSlide(CHART))).toBeFalsy();
});

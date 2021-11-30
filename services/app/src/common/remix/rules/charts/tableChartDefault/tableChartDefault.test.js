import { toSlide } from "../../../utils/testUtils";
import { tableChartDefaultRemix } from "./tableChartDefault";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { TableType } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/table/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text and one chart or table', () => {
  expect(tableChartDefaultRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, TableType.TABLE))).toBeTruthy();
  expect(tableChartDefaultRemix.matches(toSlide(TableType.TABLE))).toBeTruthy();
  expect(tableChartDefaultRemix.matches(toSlide(PARAGRAPH, TableType.TABLE, PARAGRAPH))).toBeTruthy();
  expect(tableChartDefaultRemix.matches(toSlide(PARAGRAPH, LOGO, PARAGRAPH))).toBeFalsy();
  expect(tableChartDefaultRemix.matches(toSlide(PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
});

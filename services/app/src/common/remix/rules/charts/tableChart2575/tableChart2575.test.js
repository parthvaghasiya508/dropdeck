import { toSlide } from "../../../utils/testUtils";
import { tableChart2575Remix } from "./tableChart2575";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { TableType } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/table/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text and one chart or table', () => {
  expect(tableChart2575Remix.matches(toSlide(TableType.TABLE))).toBeFalsy();
  expect(tableChart2575Remix.matches(toSlide(PARAGRAPH, TableType.TABLE, PARAGRAPH))).toBeTruthy();
  expect(tableChart2575Remix.matches(toSlide(PARAGRAPH, LOGO, PARAGRAPH))).toBeFalsy();
  expect(tableChart2575Remix.matches(toSlide(PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
});

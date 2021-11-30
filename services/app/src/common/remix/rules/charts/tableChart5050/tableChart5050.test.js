import { toSlide } from "../../../utils/testUtils";
import { tableChart5050Remix } from "./tableChart5050";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { TableType } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/table/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with text and one table or chart', () => {
  expect(tableChart5050Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, TableType.TABLE))).toBeTruthy();
  expect(tableChart5050Remix.matches(toSlide(TableType.TABLE))).toBeFalsy();
  expect(tableChart5050Remix.matches(toSlide(PARAGRAPH, TableType.TABLE, PARAGRAPH))).toBeTruthy();
  expect(tableChart5050Remix.matches(toSlide(PARAGRAPH, LOGO, PARAGRAPH))).toBeFalsy();
  expect(tableChart5050Remix.matches(toSlide(PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
});

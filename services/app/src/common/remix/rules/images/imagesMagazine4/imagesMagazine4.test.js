import { toSlide } from "../../../utils/testUtils";
import { imagesMagazine4Remix } from "./imagesMagazine4";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 4-11 images', () => {
  expect(imagesMagazine4Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, IMAGE, IMAGE))).toBeTruthy();
  expect(imagesMagazine4Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imagesMagazine4Remix.matches(toSlide(IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imagesMagazine4Remix.matches(toSlide(IMAGE, IMAGE, IMAGE, PARAGRAPH, HEADING_TWO))).toBeFalsy();
  expect(imagesMagazine4Remix.matches(toSlide(HEADING_ONE, IMAGE, PARAGRAPH, IMAGE, IMAGE, IMAGE))).toBeFalsy();
});

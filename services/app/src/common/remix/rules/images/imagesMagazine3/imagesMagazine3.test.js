import { toSlide } from "../../../utils/testUtils";
import { imagesMagazine3Remix } from "./imagesMagazine3";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and 3 images', () => {
  expect(imagesMagazine3Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, IMAGE))).toBeTruthy();
  expect(imagesMagazine3Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeTruthy();
  expect(imagesMagazine3Remix.matches(toSlide(IMAGE, IMAGE, IMAGE, IMAGE, HEADING_TWO))).toBeFalsy();
  expect(imagesMagazine3Remix.matches(toSlide(IMAGE, IMAGE, PARAGRAPH, HEADING_TWO))).toBeFalsy();
  expect(imagesMagazine3Remix.matches(toSlide(HEADING_ONE, PARAGRAPH, IMAGE, IMAGE))).toBeFalsy();
});

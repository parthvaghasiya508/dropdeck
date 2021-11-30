import { toSlide } from "../../../utils/testUtils";
import { imagesGrid } from "./imagesGrid";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";

it('should match a slide with at least 12 images', () => {
  expect(imagesGrid.matches(toSlide(IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE))).toBeTruthy();
  expect(imagesGrid.matches(toSlide(IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE, IMAGE))).toBeFalsy();
});

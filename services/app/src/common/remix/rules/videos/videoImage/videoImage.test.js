import { toSlide } from "../../../utils/testUtils";
import { videoImageRemix } from "./videoImage";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { VIDEO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";

it('should match text + image and video', () => {
  expect(videoImageRemix.matches(toSlide(HEADING_ONE, VIDEO))).toBeFalsy();
  expect(videoImageRemix.matches(toSlide(HEADING_ONE, IMAGE, VIDEO))).toBeTruthy();
  expect(videoImageRemix.matches(toSlide(HEADING_ONE, VIDEO, IMAGE))).toBeTruthy();
  expect(videoImageRemix.matches(toSlide(VIDEO, IMAGE, HEADING_ONE))).toBeTruthy();
  expect(videoImageRemix.matches(toSlide(VIDEO, IMAGE))).toBeTruthy();
  expect(videoImageRemix.matches(toSlide(IMAGE, VIDEO))).toBeTruthy();
});

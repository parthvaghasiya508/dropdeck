import { toSlide } from "../../../utils/testUtils";
import { videoBlurThumbRemix } from "./videoBlurThumb";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { VIDEO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";

it('should match text + a single video', () => {
  expect(videoBlurThumbRemix.matches(toSlide(HEADING_ONE, VIDEO))).toBeTruthy();
  expect(videoBlurThumbRemix.matches(toSlide(VIDEO,))).toBeFalsy();
});

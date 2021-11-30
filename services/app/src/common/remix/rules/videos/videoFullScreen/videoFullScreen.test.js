import { toSlide } from "../../../utils/testUtils";
import { videoFullScreenRemix } from "./videoFullScreen";
import { VIDEO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";

it('should match a single video', () => {
  expect(videoFullScreenRemix.matches(toSlide(VIDEO))).toBeTruthy();
  expect(videoFullScreenRemix.matches(toSlide(VIDEO, VIDEO))).toBeFalsy();
});

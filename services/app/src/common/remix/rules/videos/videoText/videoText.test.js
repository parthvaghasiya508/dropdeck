import { toSlide } from "../../../utils/testUtils";
import { videoTextRemix } from "./videoText";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { VIDEO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";

it('should match text + a single video', () => {
  expect(videoTextRemix.matches(toSlide(HEADING_ONE, VIDEO))).toBeTruthy();
  expect(videoTextRemix.matches(toSlide(VIDEO,))).toBeFalsy();
});

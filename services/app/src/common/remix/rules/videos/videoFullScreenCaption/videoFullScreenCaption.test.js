import { toSlide } from "../../../utils/testUtils";
import { videoFullScreenCaptionRemix } from "./videoFullScreenCaption";
import { VIDEO } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a single video followed by one or more paragraphs', () => {
  expect(videoFullScreenCaptionRemix.matches(toSlide(VIDEO))).toBeFalsy();
  expect(videoFullScreenCaptionRemix.matches(toSlide(VIDEO, PARAGRAPH))).toBeTruthy();
  expect(videoFullScreenCaptionRemix.matches(toSlide(PARAGRAPH, VIDEO))).toBeFalsy();
  expect(videoFullScreenCaptionRemix.matches(toSlide(VIDEO, VIDEO))).toBeFalsy();
});

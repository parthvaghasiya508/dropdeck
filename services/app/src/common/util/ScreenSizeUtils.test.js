import { calculateSlideSize } from "./ScreenSizeUtils";
import { DEFAULT_ASPECT_RATIO } from "../model/Deck";

it('should return dimensions based on limiting dimension in aspect of screen', () => {
  // Default aspect ratio
  const wideNotTall = calculateSlideSize(970, 500, DEFAULT_ASPECT_RATIO);
  // This means we can't use the full width
  expect(wideNotTall.width).toBe(800);
  // But we use the full height
  expect(wideNotTall.height).toBe(500);

  // Super wide aspect ratio
  const wideNotTall16x9 = calculateSlideSize(970, 500, "16x9");
  // This means we can't use the full width but we can go wider than standard resolution
  expect(wideNotTall16x9.width).toBe(889);
  // But we use the full height
  expect(wideNotTall16x9.height).toBe(500);

  // Default aspect ratio, but screen is now taller than wide
  const tallNotWide = calculateSlideSize(500, 970, DEFAULT_ASPECT_RATIO);
  // This means we use the full width
  expect(tallNotWide.width).toBe(500);
  // But we have to limit the height
  expect(tallNotWide.height).toBe(313);
});

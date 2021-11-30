import { DEFAULT_SCALING, MAX_SCALING } from "../../../../Slide/scalingLimits";

const max = (a, b) => (a > b ? a : b);
const minmax = (x, min, max) => {
  if (x > max) return max;
  if (x < min) return min;
  return x;
};

// // We want to ensure that we scale down headings less than other text.
// // Since x is between 0 and 1, we know that sqrt(x) >= x (and same for x^0.75).
// const nonUniformFontScaling = (scalingRatio) => ({
//   text: scalingRatio,
//   h1: scalingRatio ** 0.5,
//   h2: scalingRatio ** 0.75,
// });

/**
 * Calculate a font size (with 2 decimal points) based on the slide width and scaling factor.
 *
 * @param slideWidth width of the slide container.
 * @param fontScaling scaling factor for relative up/down scaling.
 * @param remix remix of the current slide.
 * @returns number
 */
export const fontSizeFromWidth = (slideWidth, fontScaling = DEFAULT_SCALING, remix) => {

  // Scaling between 0 and MAX_SCALING.
  const scalingNormalised = minmax(fontScaling, 0, MAX_SCALING);
  const fontSize = max(1, Math.round(10 * Math.round(slideWidth) * scalingNormalised)) / 1000;
  return fontSize;
};

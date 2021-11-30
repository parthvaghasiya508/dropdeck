const MIN_FONT_SIZE = 9;
const DEFAULT_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 25;
const COEFFICIENT = 0.01;
const MIN_SLIDE_WIDTH = 300;

export const fontSizeFromWidth = (width) => {
  if (!width) return DEFAULT_FONT_SIZE;
  const fontSize = (width - MIN_SLIDE_WIDTH) * COEFFICIENT + MIN_FONT_SIZE;
  if (fontSize < MIN_FONT_SIZE) return MIN_FONT_SIZE;
  if (fontSize > MAX_FONT_SIZE) return MAX_FONT_SIZE;
  return fontSize;
};

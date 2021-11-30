// We will increment width/height requested in increments of 100px.
export const STEP_SIZE = 100;

export const stepRounding = (x) => Math.max(STEP_SIZE, Math.ceil(x / STEP_SIZE) * STEP_SIZE);

export const imageScaling = (width, height, previousRatio) => {
  if (width === 0 && height === 0) {
    return [STEP_SIZE, 0];
  }

  // If we have both width and height, then we round the width (to always
  // base our calculations on the same dimension) and then relative to that
  // we derive the height, only rounding to the nearest whole number.
  if (width > 0 && height > 0) {
    const widthRounded = stepRounding(width);
    const ratio = previousRatio || (width / height);
    const heightRelative = (widthRounded / ratio).toFixed();
    return [widthRounded, heightRelative, ratio];
  }
  return width > 0 ? [stepRounding(width), 0] : [0, stepRounding(height)];
};

import chroma from "chroma-js";
import { darken, luminance } from "../common/slide/analysis/analyzers/ColorSwatch/ColorUtils";

export const EMPHASIS_SELECTOR = "span.emphasis";
export const MIN_CONTRAST = 2;

export const getBlendMode = (background, text) => {
  if (luminance(text) > luminance(background)) {
    return "darken";
  }
  return "lighten";
};

export const createScale = (background, accent, colors = 5) => chroma.scale([background, accent]).colors(colors);

export const createHighlightColor = (background, accent, text, number = 10) => {
  let contrastingColor = accent;

  // Empirically selected distance for when things become too similar
  if (chroma.distance(accent, background) < 40) {
    contrastingColor = text;
  }

  return createScale(background, contrastingColor, number)[luminance(background) > luminance(contrastingColor) ? 2 : 4];
};

/**
 * Creates the dynamic component of emphasis/highlighting style.
 *
 * @param palette
 * @param textColor
 * @returns {{boxShadow: string, backgroundColor, mixBlendMode: string, textShadow: string}}
 */
export const createHighlightStyle = (palette, textColor) => {
  const highlightBackgroundColor = createHighlightColor(palette.backgroundColor, palette.accentColor, textColor);

  // Blend mode assumes generic text is `palette.textColor`.
  return {
    backgroundColor: highlightBackgroundColor,
    boxShadow: `0.15em 0 0 ${highlightBackgroundColor}, -0.15em 0 0 ${highlightBackgroundColor}, inset 0.02em 0 0.02em ${highlightBackgroundColor}, inset -0.02em 0 0.02em ${highlightBackgroundColor}, inset 0.02em 0 0.02em ${highlightBackgroundColor}, inset -0.02em 0 0.02em ${highlightBackgroundColor}, inset 0.02em 0 0.02em ${highlightBackgroundColor}, inset -0.02em 0 0.02em ${highlightBackgroundColor}`,
    textShadow: `0 0.005em 0.0075em ${darken(palette.accentColor, 1.000001)}`,
    mixBlendMode: getBlendMode(textColor, highlightBackgroundColor),
  };
};

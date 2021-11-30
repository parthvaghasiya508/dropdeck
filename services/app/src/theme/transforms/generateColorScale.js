import chroma from "chroma-js";
import { colorSpec } from "./colorSpec";
import { interpolate } from "./interpolate";
import { isLight } from "./isLight";

const ColorScheme = require('color-scheme');

const COLORFULNESS_THRESHOLD = 7;
const MINIMUM_COLOURS = 6;

export const generateColorScale = (primaryColor, secondaryColor, n = MINIMUM_COLOURS) => {

  // We ensure we always generate a minimum number of colours for less contrast.
  if (n < MINIMUM_COLOURS) {
    n = MINIMUM_COLOURS;
  }

  let fromColor = primaryColor;

  // If the seed colour has a very low level of "colorfulness" then the
  // scheme will generate a near monochromatic list of colours. We therefore
  // fall back to a default monochromatic range:
  // TODO We need a better way of providing a fallback
  if (colorSpec(primaryColor).colorfulness < COLORFULNESS_THRESHOLD) {
    // Let's try the secondary color too.
    if (colorSpec(secondaryColor).colorfulness < COLORFULNESS_THRESHOLD) {

      // Let's start from a light colour if the primary colour was "light" (and vice versa).
      const colorIsLight = isLight(primaryColor);
      const range = colorIsLight ? ['#eee', '#111'] : ['#111', '#eee'];
      return chroma.scale(range)
        .correctLightness()
        .colors(n);
    }

    // Secondary color as a backup.
    fromColor = secondaryColor;

  }

  const scheme = new ColorScheme();

  /*
    Returns an array of 12 colors in RRGGBB hexidecimal notation
    (without a leading "#") depending on the color scheme and addComplement
    parameter. For each set of four, the first is usually the most saturated color,
    the second a darkened version, the third a pale version and fourth
    a less-pale version.
   */
  scheme.from_hex(fromColor.replace(`#`, ''))
    .scheme('contrast');

  const colors = scheme.colors();
  const range = [fromColor, `#${colors[4]}`];
  return interpolate(range, n);

  // Mix up the colours:
  // return mix(scheme.colors().map((color) => `#${color}`));
  // return mix(scheme.colors().map((color) => `#${color}`));
};

const mix = (colors) => {
  const groupSize = 4;
  if (colors.length % groupSize !== 0) {
    return colors;
  }
  const groups = colors.length / groupSize; // recall: this is a multiple of 4!
  const mixedColors = [];
  for (let offset = 0; offset < groupSize; offset++) {
    for (let i = 0; i < groups; i++) {
      mixedColors.push(colors[i * groupSize + offset]);
    }
  }
  return mixedColors;
};

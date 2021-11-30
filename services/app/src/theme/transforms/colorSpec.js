import chroma from "chroma-js";

/**
 * Chroma is the perceived strength of a surface colour, the degree of visual difference from a neutral grey of the same
 * lightness. In recent technical literature of colour appearance, chroma is defined as "colorfulness" of an object
 * relative to the brightness of a white object similarly illuminated, which allows for the fact that a surface of a
 * given chroma displays increasing colorfulness as the level of illumination increases.
 *
 * The range for the chroma depend on the hue, but go roughly from 0..100-150.
 * @param color
 * @returns {*}
 */
export const colorSpec = (color) => {
  const components = chroma(color).lch();
  return { colorfulness: components[1], brightness: components[0] };
};

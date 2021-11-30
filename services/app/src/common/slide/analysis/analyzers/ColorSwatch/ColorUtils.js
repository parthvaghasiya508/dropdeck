import React from "react";
import * as culori from "culori";
import { lab } from "culori";
import chroma from 'chroma-js';

/**
 * Get color in HSV space.
 *
 * @param color
 * @returns {any}
 */
export const hsv = (color) => culori.hsv(color);

const UGLY_LOWER_BOUNDARY = [14, 100, 80];
const UGLY_UPPER_BOUNDARY = [48, 255, 190];

/**
 * Check if a color is ugly, that is a shade of browny green.
 * TODO Add ability to print out palette of undesirable colors, see {@link UglyPalette}.
 *
 * @param color
 * @returns {boolean}
 */
export const ugly = (color) => {
  const c = hsv(color);

  return c.h >= UGLY_LOWER_BOUNDARY[0] && c.h <= UGLY_UPPER_BOUNDARY[0] && c.s * 255 >= UGLY_LOWER_BOUNDARY[1] && c.s * 255 <= UGLY_UPPER_BOUNDARY[1] && c.v * 255 >= UGLY_LOWER_BOUNDARY[2] && c.v * 255 <= UGLY_UPPER_BOUNDARY[2];
};

/**
 * Component to display our palette of ugly colors: <UglyPalette lower={[14, 100, 80]} upper={[48, 255, 190]}/>
 * TODO We could consider writing the image data to a file to add to CI.
 *
 * @param lower
 * @param upper
 * @returns {JSX.Element}
 * @constructor
 */
export const UglyPalette = ({ lower = UGLY_LOWER_BOUNDARY, upper = UGLY_UPPER_BOUNDARY }) => {
  const fillRange = (start, end, step = 1) => Array(Math.round((end - start) / step)).fill().map((item, index) => start + (index * step));

  const hValues = fillRange(lower[0], upper[0]);

  const sValues = fillRange(lower[1], upper[1]);

  const vValues = fillRange(lower[2], upper[2]);

  const colors = [];

  vValues.forEach((v) => {
    sValues.forEach((s) => {
      hValues.forEach((h) => {
        colors.push(culori.rgb({
          mode: "hsv",
          h,
          s: s / 255,
          v: v / 255
        }));
      });
    });
  });

  const size = Math.ceil(Math.sqrt(colors.length));
  const data = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const image = ctx.createImageData(size, size);
    let index = 0;
    for (let i = 0; i < image.data.length; i += 4) {
      if (index < colors.length) {
        image.data[i] = colors[index].r * 255;
        image.data[i + 1] = colors[index].g * 255;
        image.data[i + 2] = colors[index].b * 255;
        image.data[i + 3] = 255;
        index++;
      } else {
        break;
      }
    }
    ctx.putImageData(image, 0, 0);
    return canvas.toDataURL();
  };

  return (<img alt="ugly" height={size} width={size} src={data()}/>);
};

/**
 * Calculate luminance for a colour, the result is a value between 0
 * and 1 (darkest black to lightest white).
 *
 * @param color
 * @returns {*}
 */
export const luminance = (color) => culori.wcagLuminance(color);

const LUMINANCE_THRESHOLD = 0.3; // Anything smaller than this is a dark colour

/**
 * Check if a colour is at the darker end of the spectrum.
 *
 * @param color
 * @returns {*}
 */
export const isDark = (color) => luminance(color) < LUMINANCE_THRESHOLD;
/**
 * Sort a list of colours by luminance.
 *
 * @param colors
 * @returns {*[]}
 */
export const sortByLuminance = (...colors) => {
  const lum = colors.map((color) => [color, luminance(color)]);
  return lum.sort((a, b) => a[1] - b[1]).map((el) => el[0]);
};

/**
 * Calculate contrast value between two colours.
 *
 * @param base
 * @param color
 * @returns {*}
 */
export const contrast = (base, color) => culori.wcagContrast(base, color);

/**
 * Sort a list of colours by luminance.
 *
 * @param colors
 * @returns {*[]}
 */
export const sortByPunch = (...colors) => {
  const punch = colors.map((color) => {
    const hsvColor = culori.hsv(color);
    const distance = Math.sqrt(hsvColor.v ** 2 + hsvColor.s ** 2);
    const angle = Math.atan2(hsvColor.v, hsvColor.s) * (180 / Math.PI);
    return { angle, distance, hsv: hsvColor, ce: ((90 - angle)) * distance, color };
  });

  return punch.sort((a, b) => b.ce - a.ce).map((el) => el.color);
};

/**
 * Get the colour with highest contrast value compared to base.
 *
 * @param base
 * @param colors
 * @returns {*}
 */
export const maxContrast = (base, ...colors) => {
  const contrasts = colors.map((color) => contrast(base, color));
  return colors[contrasts.indexOf(Math.max(...contrasts))];
};

/**
 * Choose a colour as long as it meets minimum contrast criteria, or fall back on another.
 *
 * @param base
 * @param preferred
 * @param fallback
 * @param minimumContrast
 * @returns {*}
 */
export const chooseByContrast = (base, preferred, fallback, minimumContrast) => {
  if (contrast(base, preferred) > minimumContrast) {
    return preferred;
  }
  return fallback;
};

/**
 * Compute the Kotsarenko/Ramos color difference between the colors a and b.
 * This is a weighted Euclidean distance in the yiq color space.
 *
 * @param colorA
 * @param colorB
 * @returns {number}
 */
export const similarity = (colorA, colorB) => culori.differenceKotsarenkoRamos()(lab(colorA), lab(colorB));

/**
 * Remove colours from a contiguous sequence that are similar to each other by a
 * set threshold. The original order of colours albeit sorted for comparison is
 * not changed.
 *
 * @param threshold
 * @param colors
 * @returns {*[]}
 */
export const removeSimilar = (threshold, ...colors) => {
  const sorted = sortByLuminance(...colors);
  const remove = [];
  for (let i = 0; i < sorted.length; i++) {
    const c1 = sorted[i];
    if (i + 1 < sorted.length) {
      const c2 = sorted[i + 1];
      const diff = culori.differenceKotsarenkoRamos()(lab(c1), lab(c2));
      if (diff < threshold) {
        remove.push(c2);
      }
    }
  }
  return colors.filter((c) => remove.indexOf(c) === -1);
};

/**
 * Lighten a colour.
 *
 * @param color
 * @param factor  Factor is a number greater than 1 to make lighter.
 * @returns {any}
 */
export const lighten = (color, factor) => chroma(color).brighten(factor).hex();

/**
 * Darken a colour.
 *
 * @param color
 * @param factor  A value greater than 1 to make darker.
 * @returns {any}
 */
export const darken = (color, factor) => chroma(color).darken(factor).hex();

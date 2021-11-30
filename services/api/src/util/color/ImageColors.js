import ColorThief from "colorthief";
import * as culori from "culori";
import { logger } from "../logger.js";

/**
 * Get a palette of colours from an image.
 *
 */
class ImageColors {

  constructor(palette) {
    this.palette = palette;
  }

  /**
   * The dominant colour in an image.
   *
   * @returns {*}
   */
  dominant() {
    return this.palette[0];
  }

  /**
   * Use this to get a palette instance from an image path.
   *
   * @param path
   * @returns {Promise<ImageColors>}
   */
  static async from(path) {
    return ColorThief.getPalette(path, 5)
      .then((p) => {
        const rgb = p.map((color) => ({ mode: "rgb", r: (color[0] / 255), g: (color[1] / 255), b: (color[2] / 255) }));
        return Promise.resolve(new ImageColors(rgb));
      })
      .catch((e) => {
        logger.error(`Unable to process colours from ${path}`);
        logger.error(e);
        return Promise.resolve();
      });
  }
}
export default ImageColors;

/**
 * Map new style palette to a legacy format used previously.
 *
 * @param palette
 * @returns {Promise<Promise|any>}
 */
export const legacyMapper = async (palette) => palette.then(
  (colors) => ((colors) ? colors.palette.map((color) => culori.formatHex(color)) : {})
);

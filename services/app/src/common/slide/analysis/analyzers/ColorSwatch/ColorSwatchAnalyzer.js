import SlideAnalyzer from "../../SlideAnalyzer";
import ColorSwatch from "./ColorSwatch";
import { chooseByContrast, contrast, darken, isDark, lighten, removeSimilar, sortByPunch, ugly } from "./ColorUtils";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import Palette, { Origin } from "../../../../../theme/Palette";

const MINIMUM_CONTRAST_POSITIVE = 2.5; // Just enough to ensure contrast on white
const MINIMUM_CONTRAST_NEGATIVE = 1.75; // More tolerance for lighter text on dark background

/**
 * Analyse colors extracted from all images on a slide and create a canonical palette
 * for users.
 *
 * Adds `ColorSwatchAnalyzer` object to slide settings.
 *
 */
export default class ColorSwatchAnalyzer extends SlideAnalyzer {

  constructor() {
    super(IMAGE);
    this.swatches = [];
  }

  /**
   * Create saturated palettes (saturated background) per swatch from images.
   *
   * @param palettes
   * @param swatch
   * @returns {*}
   */
  createNegativePalettes = (palettes, swatch) => {
    swatch.colors.forEach((color, i) => {
      // logger.debug(`${color} contrast: ${contrast("#fff", color)}`);
      // logger.debug(`${color} luminance: ${luminance(color)}`);
      // logger.debug(`${color} is ugly: ${ugly(color)}`);
      if (i === 0 || !ugly(color)) {
        palettes.push(Palette.fromDataObject({
          accentColor: chooseByContrast(color, (!isDark(color) ? darken(color, 1.75) : "#fff"), "#000", MINIMUM_CONTRAST_NEGATIVE),
          backgroundColor: color,
          titleColor: chooseByContrast(color, (!isDark(color) ? darken(color, 1.75) : "#fff"), "#000", MINIMUM_CONTRAST_NEGATIVE),
          textColor: chooseByContrast(color, (isDark(color) ? lighten(color, 3) : lighten(color, 1.5)), "#000", MINIMUM_CONTRAST_NEGATIVE),
        }).origin(Origin.Image).saturated(true));
      }
    });
  };

  /**
   * Create positive palette variations (colour on light background).
   *
   * @param palettes
   * @param swatch
   */
  createPositivePalettes = (palettes, swatch) => {
    swatch.colors.forEach((color) => {
      if (!ugly(color) && contrast("#fff", color) > MINIMUM_CONTRAST_POSITIVE) {
        palettes.push(Palette.fromDataObject({
          accentColor: color,
          backgroundColor: "#fff",
          titleColor: darken(color, 0.8),
          textColor: color,
        }).origin(Origin.Image));
      }
    });
  };

  /**
   * Iterate all `image` nodes.
   *
   * @param node
   * @returns {*}
   */
  add = (node) => {
    if (node.settings && node.settings.swatch && node.settings.swatch.length > 0) {
      this.swatches.push(new ColorSwatch(node.settings.swatch));
    }
  };

  /**
   * Combine swatches and build a canonical swatch and suggested palette.
   *
   * @returns {*}
   */
  process = () => {
    const canonical = new ColorSwatch([]);

    this.swatches.forEach((swatch) => {
      if (swatch && swatch.colors && Array.isArray(swatch.colors) && swatch.colors.length > 0) {
        swatch.colors.forEach((color) => {
          canonical.colors.push(color);
        });
      }
    });

    canonical.colors = sortByPunch(...canonical.colors);
    canonical.colors = removeSimilar(0.05, ...canonical.colors);

    const paletteSuggestions = [];

    this.createNegativePalettes(paletteSuggestions, canonical);
    this.createPositivePalettes(paletteSuggestions, canonical);

    return {
      ColorSwatchAnalyzer: {
        canonical,
        paletteSuggestions
      }
    };
  };
}

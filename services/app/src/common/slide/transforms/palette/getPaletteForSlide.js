import { ThemeFactory } from "../../../theme/ThemeFactory";
import { KEY_PALETTES } from "./setPaletteForSlide";
import Palette from "../../../../theme/Palette";
import { RemixEngine } from "../../../remix/RemixEngine";
import { getStoredImagePaletteSuggestionsForSlide } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/queries/getStoredImagePaletteSuggestionsForSlide";

export const KEY_IMAGE_PALETTE_SUGGESTIONS = 'imagePalettes';

/**
 * Checks whether we have a stored palette for this slide.
 *
 * @param themeName
 * @param settings
 * @returns {boolean}
 */
export const hasStoredPaletteForSlide = (themeName, settings) => (
  themeName && settings && settings[KEY_PALETTES] !== undefined && settings[KEY_PALETTES][themeName] !== undefined
);

/**
 * Obtains a colour palette that has been explicitly set and stored for the given slide.
 *
 * @param themeName
 * @param settings
 * @returns {Palette|undefined|*}
 */
export const getStoredPaletteForSlide = (themeName = ThemeFactory.DEFAULT_THEME_NAME, settings) => {
  if (themeName && settings && settings[KEY_PALETTES] && settings[KEY_PALETTES][themeName]) {
    // TODO This could do with refactoring https://github.com/dropdeck-com/dropdeck/issues/2508
    const { accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath, mood, saturated, origin } = settings[KEY_PALETTES][themeName];
    const palette = new Palette(accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath);
    palette._mood = mood;
    palette._saturated = saturated;
    palette._origin = origin;
    return palette;
  }
  return undefined;
};

/**
 * Obtains a colour palette for the given slide. We do this in 2 steps:
 *
 * - Firstly, we check if the slide has an explicitly set palette (in its content state). See @getStoredPaletteForSlide.
 * - If not, we secondly check if the current remix specifies a palette for the slide.
 * - Otherwise we default to the first theme palette, if a theme is specified.
 *
 * @param themeName
 * @param settings
 * @param remixName
 * @returns {Palette|undefined|*}
 */
export const getPaletteForSlide = (themeName = ThemeFactory.DEFAULT_THEME_NAME, settings, remixName) => {

  // First check for a stored palette (in content state).
  const storedPalette = getStoredPaletteForSlide(themeName, settings);
  if (storedPalette) {
    return storedPalette;
  }

  // Next compute a default palette for the given remix and theme.
  if (themeName) {

    const theme = ThemeFactory.instance.get(themeName).component;
    if (theme) {
      if (!remixName) {
        remixName = settings?.remix;
      }
      if (remixName) {
        const remixEngine = RemixEngine.instance;
        const remix = remixEngine.get(remixName);
        if (remix && remix.defaultPalette) {
          const imagePaletteSuggestions = getStoredImagePaletteSuggestionsForSlide(settings);
          const remixPalette = remix.defaultPalette(theme, imagePaletteSuggestions);
          if (remixPalette) {
            return remixPalette;
          }
        }
      }

      return theme.defaultPalette();
    }
  }
  return undefined;
};

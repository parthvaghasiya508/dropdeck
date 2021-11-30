import { KEY_IMAGE_PALETTE_SUGGESTIONS } from "../../../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import Palette from "../../../../../../../../../../theme/Palette";

/**
 * Retrieves stored image palette suggestions from slide settings and maps to Palette objects.
 *
 * @param settings slide settings.
 * @returns {(palette)[]}
 */
export const getStoredImagePaletteSuggestionsForSlide = (settings = {}) => {
  const paletteDataObjects = settings ? settings[KEY_IMAGE_PALETTE_SUGGESTIONS] : [];
  if (paletteDataObjects && Array.isArray(paletteDataObjects)) {
    return paletteDataObjects.map((dataObject) => Palette.fromDataObject(dataObject));
  }
  return [];
};

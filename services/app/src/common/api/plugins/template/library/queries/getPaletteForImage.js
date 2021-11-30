import { IMAGE } from "../../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { getPalettesSuggestionsForSlide } from "../../../../../../modules/presenter/components/Lightbox/components/PaletteSuggestionComponent/queries/getPalettesSuggestionsForSlide";
import PaletteSet from "../../../../../../theme/PaletteSet";

export const getPaletteForImage = (imageSettings, theme, defaultPalette, remix) => {
  if (!imageSettings || !theme || !remix || !remix.defaultPalette) {
    return defaultPalette;
  }
  if (!Array.isArray(imageSettings)) {
    imageSettings = [imageSettings];
  }
  const slideNode = {
    children: imageSettings.map((settings) => ({
      type: IMAGE,
      settings,
    })),
  };
  const paletteSuggestions = getPalettesSuggestionsForSlide({ node: slideNode }, theme);
  if (paletteSuggestions && paletteSuggestions.length > 0) {
    const paletteSet = PaletteSet.fromArray(paletteSuggestions);
    return remix.defaultPalette(paletteSet);
  }
  return defaultPalette;
};

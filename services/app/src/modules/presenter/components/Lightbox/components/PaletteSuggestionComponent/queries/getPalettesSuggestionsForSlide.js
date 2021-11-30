import SlideAnalyzerService from "../../../../../../../common/slide/analysis/SlideAnalyzerService";
import { extractPaletteSuggestions } from "../../../transforms/extractPaletteSuggestions";
import LogoPaletteAnalyzer
  from "../../../../../../composer/components/DeckEditor/modules/plugins/component/media/logo/analysis/LogoPaletteAnalyzer";
import { KEY_IMAGE_PALETTE_SUGGESTIONS } from "../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { logger } from "../../../../../../../common/util/logger";
import { imagePaletteSuggestionsForSlide } from "../../../../../../composer/components/DeckEditor/modules/plugins/component/media/image/queries/imagePaletteSuggestionsForSlide";

/**
 * Analyse the slide and gather palette suggestions.
 *
 * @param slide slide instance.
 * @param theme theme name.
 */
export const getPalettesSuggestionsForSlide = (slide, theme) => {

  let imageColorSwatchSuggestions;
  if (slide.node?.settings && slide.node?.settings[KEY_IMAGE_PALETTE_SUGGESTIONS] !== undefined) {
    imageColorSwatchSuggestions = slide.node?.settings[KEY_IMAGE_PALETTE_SUGGESTIONS];
    logger.trace(`Found stored image palette suggestions for slide ${slide.id}`);
  } else {
    imageColorSwatchSuggestions = imagePaletteSuggestionsForSlide(slide.node);
  }
  const imagePaletteSuggestions = extractPaletteSuggestions(imageColorSwatchSuggestions, theme);

  const logoPaletteColorPalettes = (slide.node ? SlideAnalyzerService.process(new LogoPaletteAnalyzer(), slide.node) : []);
  const logoPaletteSuggestions = extractPaletteSuggestions(logoPaletteColorPalettes, theme);
  return [...imagePaletteSuggestions, ...logoPaletteSuggestions];
};

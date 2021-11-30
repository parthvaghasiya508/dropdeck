import SlideAnalyzerService from "../../../../../../../../../../common/slide/analysis/SlideAnalyzerService";
import ColorSwatchAnalyzer
  from "../../../../../../../../../../common/slide/analysis/analyzers/ColorSwatch/ColorSwatchAnalyzer";

export const imagePaletteSuggestionsForSlide = (slideNode) => {
  const swatchAnalysis = slideNode ? (SlideAnalyzerService.process(new ColorSwatchAnalyzer(), slideNode)) : {};
  return swatchAnalysis.ColorSwatchAnalyzer ? swatchAnalysis.ColorSwatchAnalyzer.paletteSuggestions : [];
};

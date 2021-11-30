import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import { Moods } from "../../../../../theme/Palette";

export const statementSlideTemplate = (dataProvider = new DataProvider()) => {
  const { sentiment, theme } = dataProvider;
  let palette;
  if (sentiment && sentiment.valence && theme) {
    const mood = sentiment.valence;
    if (mood === Moods.Positive || mood === Moods.Negative) {
      const dynamicPalettes = theme.palettes.byMood(mood).filter((palette) => !palette.saturated());
      if (dynamicPalettes && dynamicPalettes.length > 0) {
        const [dynamicPalette] = dynamicPalettes;
        palette = dynamicPalette;
      }
    }
  }

  return componentBuilder()
    .template({
      name: 'Statement',
      palette,
    })
    .title('Make a statement')
    .paragraph('Dynamic colour scheme to reflect sentiment');
};

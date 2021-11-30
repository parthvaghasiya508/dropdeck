import { ThemeFactory } from "../../../theme/ThemeFactory";
import { getPaletteForSlide } from "./getPaletteForSlide";

export const getColorChartForSlide = (themeName, settings, remixName) => {
  const palette = getPaletteForSlide(themeName, settings, remixName);
  let theme = ThemeFactory.instance.get(themeName).component;
  if (!theme) {
    theme = ThemeFactory.DEFAULT_THEME;
  }
  return theme.colorChart(palette);
};

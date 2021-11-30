import { chooseRemix } from "../../../../../common/slide/transforms";
import { ThemeFactory } from "../../../../../common/theme/ThemeFactory";
import { slidePaletteClassName } from "../components/LightboxSlide/queries/getThemeRemixPaletteOverride";
import { getPaletteForSlide } from "../../../../../common/slide/transforms/palette/getPaletteForSlide";

const removeDuplicates = (array) => [...new Set(array)];

export const hashForSlideStyles = (slides, themeName) => {
  if (!slides || !themeName) {
    return null;
  }

  const theme = ThemeFactory.instance.get(themeName)?.component;

  const remixHash = removeDuplicates(
    slides.map((slide) => {
      const remixName = chooseRemix(slide);
      if (!remixName) {
        return ''; // this is covered by palette hash string, below
      }
      return `${remixName}@${slidePaletteClassName(slide, theme, remixName)}`;
    }).sort()
  ).filter((s) => s.length > 0).join(',');

  const paletteHash = removeDuplicates(
    slides.map((slide) => {
      const remixName = chooseRemix(slide);
      const palette = getPaletteForSlide(themeName, slide.settings, remixName);
      return palette ? palette.id() : '';
    }).sort()
  ).filter((s) => s.length > 0).join(',');

  return `${remixHash}#${paletteHash}`;
};

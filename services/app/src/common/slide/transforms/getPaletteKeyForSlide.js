import { RemixEngine } from "../../remix/RemixEngine";
import { slidePaletteClassName } from "../../../modules/presenter/components/Lightbox/components/LightboxSlide/queries/getThemeRemixPaletteOverride";
import { ThemeFactory } from "../../theme/ThemeFactory";

export const getPaletteKeyForSlide = (remix, themeName, slide) => {
  if (typeof remix === 'string') {
    remix = RemixEngine.instance.get(remix);
  }
  if (remix) {
    // const hasPalette = hasStoredPaletteForSlide(themeName, slide.settings);
    if (remix.relativeToPalette) {
      const paletteOverrideKey = slidePaletteClassName(slide, ThemeFactory.instance.get(themeName)?.component, remix.name());
      return `.${paletteOverrideKey}`; // `.slide-${slide.id}`;
    }
  }
  return '';
};

import Palette from "../../../../../../../theme/Palette";
import { getPaletteForSlide } from "../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { chooseRemix } from "../../../../../../../common/slide/transforms";

const toPalette = (p) => {
  const { accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath } = p;
  return new Palette(accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath);
};

const encodeAsCssClassName = (s) => (s !== undefined && s !== null && typeof s === 'string' && s.replaceAll ? s.replaceAll('#', '').replaceAll('.', '').replaceAll('/', '-') : '');

export const slidePaletteClassName = (slide, theme, remixName) => {
  const p = getPaletteForSlide(theme.id, slide.settings, remixName) || theme.defaultPalette();
  const { accentColor, backgroundColor, titleColor, subtitleColor, textColor, imagePath } = p;
  const paletteEncoding = `${accentColor}-${backgroundColor}-${titleColor}-${subtitleColor}-${textColor}${imagePath ? `-${imagePath}` : ''}`;
  return `p-${encodeAsCssClassName(paletteEncoding)}`; // was previously: `slide-${slide.id}`
};

export const getThemePaletteOverrides = (slides, theme, branding) => {
  const paletteOverrideStyles = {};
  slides.forEach((slide) => {
    const remixName = chooseRemix(slide);
    const slidePaletteOverrides = getThemeRemixPaletteOverride(slide, theme, branding, remixName);
    if (Object.keys(slidePaletteOverrides).length > 0) {

      // Needs to be scoped to remix + palette
      const slidePaletteKey = `& .${slidePaletteClassName(slide, theme, remixName)}`;
      if (paletteOverrideStyles[slidePaletteKey]) {
        const existingStyles = paletteOverrideStyles[slidePaletteKey];
        const updatedStyles = { ...existingStyles, ...slidePaletteOverrides };
        paletteOverrideStyles[slidePaletteKey] = updatedStyles;
      } else {
        paletteOverrideStyles[slidePaletteKey] = slidePaletteOverrides;
      }
    }
  });
  return paletteOverrideStyles;
};

export const getThemeRemixPaletteOverride = (slide, theme, branding, remixName) => {
  if (theme) {
    const palette = toPalette(getPaletteForSlide(theme.id, slide.settings, remixName) || theme.defaultPalette());
    if (remixName === undefined) {
      remixName = chooseRemix(slide);
    }
    const css = theme.cssForPalette(palette, remixName, branding);
    return css;
  }

  return {};
};

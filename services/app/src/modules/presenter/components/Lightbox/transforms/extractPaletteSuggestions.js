import Palette, { Origin } from "../../../../../theme/Palette";

/**
 * Extract palette suggestions based on colour swatch analysis and a chosen theme.
 *
 * @param paletteSuggestions a list of suggested palettes.
 * @param theme current theme.
 */
export const extractPaletteSuggestions = (paletteSuggestions, theme) => {
  const suggestions = [];
  const {
    accentColor: defaultAccentColor,
    titleColor: defaultTitleColor,
    subtitleColor: defaultSubtitleColor,
    textColor: defaultTextColor,
    backgroundColor: defaultBackgroundColor
  } = theme.defaultPalette();
  // TODO: Why do we need to cast from palette suggestions to something else? Is this because you weren't creating palette objects?
  for (let i = 0; i < paletteSuggestions.length; i++) {
    const {
      accentColor,
      backgroundColor,
      titleColor,
      subtitleColor,
      textColor,
      _origin,
      _saturated
    } = paletteSuggestions[i];
    const palette = new Palette(
      accentColor || defaultAccentColor,
      backgroundColor || defaultBackgroundColor,
      titleColor || defaultTitleColor,
      subtitleColor || titleColor || defaultSubtitleColor, // use title colour as the first fallback
      textColor || defaultTextColor
    );
    suggestions.push(palette.origin(_origin).saturated(_saturated));
  }
  return suggestions;
};

/**
 * Create palettes from branding colours.
 *
 * @param theme
 * @returns {[]}
 */
export const createBrandingPalettes = (theme) => {

  const brandingPalettes = [];
  brandingPalettes.push(new Palette(theme.branding.colors.accent, "#fff", theme.branding.colors.dark, theme.branding.colors.dark, "#222").origin(Origin.Branding));
  brandingPalettes.push(new Palette(theme.branding.colors.accent, "#fff", theme.branding.colors.accent, theme.branding.colors.accent,"#222").origin(Origin.Branding));
  brandingPalettes.push(new Palette(theme.branding.colors.accent, theme.branding.colors.dark, "#fff", "#fff", "#fff").origin(Origin.Branding).saturated(true));
  brandingPalettes.push(new Palette(theme.branding.colors.light, theme.branding.colors.dark, theme.branding.colors.light, theme.branding.colors.light, "#fff").origin(Origin.Branding).saturated(true));
  brandingPalettes.push(new Palette(theme.branding.colors.dark, theme.branding.colors.accent, "#fff", "#fff", "#fff").origin(Origin.Branding).saturated(true));

  return brandingPalettes;
};

import { getThemePaletteOverrides } from "../components/Lightbox/components/LightboxSlide/queries/getThemeRemixPaletteOverride";
import { RemixEngine } from "../../../common/remix/RemixEngine";
import { defaultSlideStyles } from "../components/Slide/DefaultSlideStyles";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";
import { logger } from "../../../common/util/logger";

/**
 * Important: We need to list out palette overrides and remix styles AFTER the default styles,
 * as those should override the defaults.
 */
export const buildCombinedSlideStyles = (slides, themeName = ThemeFactory.DEFAULT_THEME_NAME, themePackage, branding, animate = true) => {
  const t0 = new Date().getTime();
  if (!Array.isArray(slides)) {
    slides = [slides];
  }
  const themeClass = themePackage && themePackage.component;
  const slideBranding = branding && themePackage && themePackage.component.branded ? branding : undefined;
  const themePaletteOverrideStyles = {
    themeStyles: getThemePaletteOverrides(slides, themeClass, slideBranding)
  };
  const { instance: remixEngine } = RemixEngine;
  const remixStyles = remixEngine.css(slides, animate, themeName);

  const t1 = new Date().getTime();
  logger.trace(`Calculating combined slide styles for ${slides.length} slides took ${t1 - t0} ms`);
  const combinedStyles = { ...defaultSlideStyles, ...remixStyles, ...themePaletteOverrideStyles };
  return combinedStyles;
};

/**
 * Combined class names for remix and theme-override classes.
 *
 * @param classes
 * @returns {string}
 */
export const remixStyleClassNames = (classes) => `${classes.remixStyles} ${classes.themeStyles}`;

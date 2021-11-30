import { makeStyles } from "@material-ui/styles";
import React, { useCallback } from "react";
import { Remix } from "../common/remix/Remix";
import { Slide } from "../common/slide/Slide";
import { createLinkElements } from "../common/util/FontUtility";
import ColorChart from "./ColorChart";
import PaletteSet from "./PaletteSet";
import { fontScalingStyles } from "../modules/presenter/components/Slide/fontScalingStyles";

/**
 * A theme for styling a deck.
 */
export default class Theme {

  constructor(id, palettes, name, branded, fonts = []) {
    this.id = id;
    this.palettes = PaletteSet.fromArray(palettes);
    this.name = name;
    this.branded = branded;
    this.fonts = fonts;
    this.paletteOverrides = {};
    this.remixOverrides = {};
  }

  /**
   * Provide an override for a specific CSS selector, using the syntax:
   *
   * when(selector).overrideWith((palette) => <css for palette>`)
   *
   * @param selector
   */
  override = (selector) => {
    const remixSelector = (selector.name && selector instanceof Remix);
    if (remixSelector) {
      const remix = selector;
      selector = remix.name();
    }
    return {
      with: (cssGenerator) => {
        if (remixSelector) {
          this.remixOverrides[selector] = cssGenerator;
        } else {
          this.paletteOverrides[selector] = cssGenerator;
        }
      },
    };
  };

  defaultPalette = () => this.palettes.primary();

  setBranding = (branding) => {
    this.branding = branding;
  };

  paletteSuggestions = () => this.palettes.all();

  // eslint-disable-next-line class-methods-use-this
  css(slideWidth) {}

  /**
   * Constructs a color chart from a given palette.
   *
   * @param palette base color palette
   */
  colorChart = (palette = this.defaultPalette()) => new ColorChart(palette.accent(), palette.background(), palette.title(), palette.text());

  linkBrandFonts = (branding) => {
    if (this.branded && branding && branding.fonts && (branding.fonts.title || branding.fonts.text)) {
      return createLinkElements(branding.fonts);
    }
    return null;
  };

  linkThemeFonts = () => this.fonts.map((font) => <link key={font} href={font} rel="stylesheet" />);

  wrap = ({ children, view }) => {
    const useStyles = makeStyles(this.css(), { deterministic: view && view === Slide.View.LIGHTBOX, meta: 'theme' });
    const classes = useStyles();
    const useFontSizeStyles = useCallback(fontScalingStyles(), []);
    const fontSizeClasses = useFontSizeStyles();
    return (
      <div className={`${classes.theme} ${fontSizeClasses.scales}`} style={{ height: "100%" }}>
        {this.branded && this.branding && this.branding.fonts ? this.linkBrandFonts(this.branding) : null}
        {this.fonts !== undefined && this.fonts.length > 0 ? this.linkThemeFonts() : null}
        {children}
      </div>
    );
  };

  wrapWithoutStyles = ({ children, classes, style }) => {
    const useFontSizeStyles = useCallback(fontScalingStyles(), []);
    const fontSizeClasses = useFontSizeStyles();
    return (
      <div className={`${classes.theme} ${fontSizeClasses.scales}`} style={{ height: "100%", ...style }}>
        {this.branded && this.branding && this.branding.fonts ? this.linkBrandFonts(this.branding) : null}
        {this.fonts !== undefined && this.fonts.length > 0 ? this.linkThemeFonts() : null}
        {children}
      </div>
    );
  };

  /**
   * Default palette overrides.
   *
   * @param palette colour palette.
   * @param branding branding set.
   */
  cssForPalette(palette, remixName, branding) {
    const combinedStyling = {
    };

    Object.keys(this.paletteOverrides).forEach((cssSelector) => {
      const styling = this.paletteOverrides[cssSelector](palette, branding);
      if (styling !== undefined) {
        combinedStyling[cssSelector] = styling;
      }
    });

    const remixOverride = remixName ? this.remixOverrides[remixName] : undefined;
    if (remixOverride) {
      const cssSelector = `& .slide.${remixName}`;
      const styling = this.remixOverrides[remixName](palette, branding);
      combinedStyling[cssSelector] = styling;
    }

    return combinedStyling;
  }
}

import chroma from "chroma-js";
import Theme from "./Theme";
import { createHighlightStyle, EMPHASIS_SELECTOR } from "./EmphasisHighlighterUtils";

export default class AbstractTheme extends Theme {

  constructor(id, palettes, name, branded, fonts = []) {
    super(id, palettes, name, branded, fonts);

    const { override } = this;

    // Default palette overrides
    override(`& ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => ({
          position: "relative",
          borderRadius: "0.2em",
          boxDecorationBreak: "clone",
          "-webkit-box-decoration-break": "clone",
          zIndex: -2,
          padding: "0.1em 0 0.125em 0",
          ...createHighlightStyle(palette, palette.textColor)
        })
      );

    override('& h1')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.titleColor,
        })
      );
    // `h1` uses a different color from `palette.textColor` so we must override the `mixBlendMode` to ensure proper emphasis handling
    override(`& h1 ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => createHighlightStyle(palette, palette.titleColor)
      );
    override('& h2')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.subtitleColor,
        })
      );
    // `h2` uses a different color from `palette.textColor` so we must override the `mixBlendMode` to ensure proper emphasis handling
    override(`& h2 ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => createHighlightStyle(palette, palette.subtitleColor)
      );
    //  We ensure inline code is formatted in line with it's parent
    override('& span.inlineCode').with(
      (palette) => ({
        backgroundColor: `${palette.accentColor}22 !important`,
        borderColor: `${palette.accentColor}22 !important`,
      })
    );
    override('& h1 span.inlineCode').with(
      (palette) => ({
        color: palette.titleColor,
      })
    );
    override('& h2 span.inlineCode').with(
      (palette) => ({
        color: palette.SubtitleColor,
      })
    );
    override('& p span.inlineCode').with(
      (palette) => ({
        color: palette.textColor,
      })
    );
    // Blockqouote based on text colour
    override('& blockquote p, & blockquote strong, & blockquote p:before, & blockquote p:after')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.textColor,
        })
      );
    // Override above uses a different color from `palette.textColor` so we must override the `mixBlendMode` to ensure proper emphasis handling
    override(`& blockquote p ${EMPHASIS_SELECTOR}, & blockquote strong ${EMPHASIS_SELECTOR}`)
      .with(
        (palette) => createHighlightStyle(palette, palette.accentColor)
      );

    override('& div.slide')
      .with(
        (palette) => ({
          backgroundColor: palette.backgroundColor,
          color: palette.textColor,
        })
      );
    override('& li:before')
      .with(
        (palette, branding) => this._addBrandingFontTitle(branding, {
          color: palette.accentColor,
        })
      );
    override('& p, & ol, & ul')
      .with(
        (palette, branding) => this._addBrandingFontText(branding, {
          color: palette.textColor,
        })
      );
    override('& a')
      .with(
        (palette) => ({
          color: "inherit",
          transition: "text-decoration 200ms ease-in",
          textDecoration: "underline",
          textDecorationSkipInk: 'auto',
          textDecorationColor: `${chroma(palette.accentColor).alpha(0.25)}`,
          "&:hover": {
            transition: "text-decoration 400ms ease-out",
            textDecorationColor: `${chroma(palette.accentColor)}`,
          }
        })
      );

    // table
    const hexPadding = (hex) => ((hex.length === 4) ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex);
    override('& .slide.tablechart-5050, & .slide.tablechart-2575').with(
      (palette) => ({
        '& .container-table, & .container-chart': {
          background: `${hexPadding(palette.accent())}18 !important`,
        },
        '& table': {
          background: `${hexPadding(palette.background())} !important`,
        },
      })
    );
    override('& table').with(
      (palette) => ({
        '& thead tr th': {
          color: palette.backgroundColor,
          backgroundColor: `${hexPadding(palette.accent())}dd !important`,
        },
        '& tbody tr td': {
          borderColor: `${hexPadding(palette.text())}44 !important`,
        },
      })
    );

    // List styling: ticks
    override('& ul.display-tick li:before').with(
      (palette) => ({
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='77px' height='77px' viewBox='0 0 77 77' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='check' d='M27.393 64.477 L75.477 16.393 70.527 11.444 27.393 54.577 5.473 32.657 0.523 37.607 Z' fill='${encodeURIComponent(palette.accent())}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E%0A")`,
      })
    );

    // List styling: crosses
    override('& ul.display-cross li:before').with(
      (palette) => ({
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='77px' height='77px' viewBox='0 0 77 77' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='--copy-2' d='M16.58 65.37 L38.491 43.458 60.42 65.37 65.37 60.42 43.383 38.567 65.37 16.58 60.42 11.63 38.456 33.594 16.58 11.63 11.63 16.58 33.48 38.57 11.63 60.42 Z' fill='${encodeURIComponent(palette.accent())}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E%0A")`,
      })
    );

    // List styling: plus
    override('& ul.display-plus li:before').with(
      (palette) => ({
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='77px' height='77px' viewBox='0 0 77 77' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='--copy-1' d='M42 73 L42 42.012 73 42 73 35 42 35.095 42 4 35 4 35 35.062 4 35 4 42 35 42.099 35 73 Z' fill='${encodeURIComponent(palette.accent())}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E%0A")`,
      })
    );

    // List styling: arrows
    override('& ul.display-arrow li:before').with(
      (palette) => ({
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='77px' height='77px' viewBox='0 0 77 77' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='arrow' d='M72.87 38 L46 64.87 41.05 59.92 58.965 42.006 4 42 4 35 58 35 59.99 35.02 41.05 16.08 46 11.13 Z' fill='${encodeURIComponent(palette.accent())}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E%0A")`,
      })
    );
  }

  /**
   * Adds specific styling overrides.
   */
  _addPaletteOverrides = (overrides) => {
    this.paletteOverrides = { ...this.paletteOverrides, ...overrides };
  };

  /**
   * Brand styling helper methods: Adds the brand title font to the given JSS snippet.
   */
  _addBrandingFontTitle = (branding, styling) => {
    if (branding && branding.fonts && branding.fonts.title?.name) {
      styling['font-family'] = `${branding.fonts.title.name} !important`;
    }
    return styling;
  };

  /**
   * Brand styling helper methods: Adds the brand font to the given JSS snippet.
   */
  _addBrandingFontText = (branding, styling) => {
    if (branding && branding.fonts && branding.fonts.text?.name) {
      styling['font-family'] = `${branding.fonts.text.name} !important`;
    }
    return styling;
  };

}

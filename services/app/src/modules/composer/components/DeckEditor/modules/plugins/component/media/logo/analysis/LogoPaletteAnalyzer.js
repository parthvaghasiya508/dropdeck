import SlideAnalyzer from "../../../../../../../../../../common/slide/analysis/SlideAnalyzer";
import { isLight } from "../../../../../../../../../../theme/transforms/isLight";
import { removeSimilar } from "../../../../../../../../../../common/slide/analysis/analyzers/ColorSwatch/ColorUtils";
import { encode } from "../../../../../../../../../../common/slide/transforms/clustering/clustering";
import { LOGO } from "../type";
import Palette, { Origin } from "../../../../../../../../../../theme/Palette";

const white = '#ffffff';
const black = '#000000';

const encodePalette = (palette) => `${palette.accentColor}_${palette.backgroundColor}_${palette.titleColor}`;

const addToTable = (palette, table) => {
  table[encodePalette(palette)] = palette;
};

/**
 * Analyse colors extracted from all logos on a slide and create a canonical palette
 * for users.
 */
export default class LogoPaletteAnalyzer extends SlideAnalyzer {

  constructor() {
    super(LOGO);
    this.palettes = [];
  }

  /**
   * Iterate all `logo` nodes. Uses a hashtable construct to deduplicate identical palettes.
   *
   * @param node
   * @returns {*}
   */
  add = (node) => {
    const paletteTable = {};
    if (node.settings && node.settings.colors) {
      const { accent, dark = black, light = white } = node.settings.colors;
      if (accent) {

        // Dark background, light text:
        addToTable({
          accentColor: accent,
          backgroundColor: dark,
          titleColor: light,
          textColor: white,
        }, paletteTable);

        // Light background, dark text:
        addToTable({
          accentColor: accent,
          backgroundColor: light,
          titleColor: dark,
          textColor: black,
        }, paletteTable);

        // Accent as background, dark text:
        const isAccentLight = isLight(accent);
        addToTable({
          accentColor: isAccentLight ? light : dark,
          backgroundColor: accent,
          titleColor: isAccentLight ? dark : light,
          textColor: isAccentLight ? black : white,
        }, paletteTable);

        // removeSimilar

        // Finally we consider white as a background (as we usually show logos on white).
        // We only do this if the current background and/or accent are not already very "white":
        const input = [accent, white, light];
        const [filtered] = removeSimilar(0.05, input);
        if (filtered.length === input.length) {
          addToTable({
            accentColor: accent,
            backgroundColor: white,
            titleColor: dark,
            textColor: black,
          }, paletteTable);
          if (!isAccentLight) {
            addToTable({
              accentColor: dark,
              backgroundColor: white,
              titleColor: accent,
              textColor: black,
            }, paletteTable);
          }
        }
      }
    }
    this.palettes.push(...Object.values(paletteTable).map((palette) => Palette.fromDataObject(palette).origin(Origin.Logo)));
  };

  /**
   * Return all  palettes identified by the analyser.
   *
   * @returns {*}
   */
  process = () => this.palettes;
}

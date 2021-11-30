import { extractPaletteSuggestions } from "../../../modules/presenter/components/Lightbox/transforms/extractPaletteSuggestions";
import PaletteSet from "../../../theme/PaletteSet";

/**
 * Base for a builder pattern to express a default palette preference.
 */
export default class PalettePicker {

  static Type = {
    THEME: 'theme',
    IMAGE: 'image',
  };

  static theme = () => new PalettePicker(PalettePicker.Type.THEME);

  static image = () => new PalettePicker(PalettePicker.Type.IMAGE);

  constructor(type = PalettePicker.Type.THEME) {
    this.type = type;
    this._saturated = undefined;
    this.mood = undefined;
    this.origin = undefined;
  }

  saturated = () => {
    this._saturated = true;
    return this;
  };

  at = (index = 0) => (theme, imagePalettes) => {
    let paletteSet;
    if (this.type === PalettePicker.Type.IMAGE) {
      const paletteSuggestions = imagePalettes ? extractPaletteSuggestions(imagePalettes, theme) : [];
      if (paletteSuggestions && paletteSuggestions.length > 0) {
        paletteSet = PaletteSet.fromArray(paletteSuggestions);
      }
    } else {
      paletteSet = theme.palettes;
    }

    if (paletteSet) {
      let palettes = [];
      if (this._saturated !== undefined && this._saturated === true) {
        palettes = paletteSet.saturated();
      } else {
        palettes = paletteSet.all();
      }
      return palettes !== undefined && palettes.length > index ? palettes[index] : undefined;
    }
  };

  first = () => this.at(0);
}

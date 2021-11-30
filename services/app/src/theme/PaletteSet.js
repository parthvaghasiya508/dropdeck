class PaletteSet {

  constructor(palettes, primary = palettes[0]) {
    this._palettes = palettes;
    this._primary = primary;
  }

  all = () => this._palettes;

  primary = () => this._primary;

  byMood = (mood) => this._palettes.filter((palette) => palette.mood() === mood);

  byOrigin = (origin) => this._palettes.filter((palette) => palette.origin() === origin);

  saturated = () => this._palettes.filter((palette) => palette.saturated());

  static fromArray(palettes) {
    return new PaletteSet(palettes);
  }
}

export default PaletteSet;

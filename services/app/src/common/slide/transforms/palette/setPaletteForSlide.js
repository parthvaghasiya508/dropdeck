export const KEY_PALETTES = 'palettes';

export const setPaletteForSlide = (editor) => (slide, themeName, palette) => {
  if (themeName && slide) {
    const storedPalettes = editor.settings(slide.path).get(KEY_PALETTES);
    const palettes = storedPalettes ? { ...storedPalettes } : {};
    palettes[themeName] = palette?.toDataObject();
    editor.settings(slide.path).set(KEY_PALETTES, palettes);
  }
};

import Palette, { Moods } from "../../../Palette";

const scheme = [
  "#66BBFF",
  "#30d158",
  "#ffcc00",
  "#ff3b30",
  "#a5d6ff",
  "#91e49d",
  "#ffe183",
  "#ff8f87",
];

export const getPalettes = () => [

  // H2 / BG / H1 / Text

  // White
  new Palette("#000000", "#ffffff", "#000000", "#000000","#333333", scheme),

  // Black
  new Palette("#FFFFFF", "#000000", "#ffffff", "#ffffff","#EEEEEE", scheme).saturated(true),

  // Bruise
  new Palette("#8d7f88", "#FFFFFF", "#8d7f88", "#8d7f88","#8d7f88", scheme),
  new Palette("#FFFFFF", "#8d7f88", "#ffffff", "#ffffff","#EEEEEE", scheme).saturated(true),

  // Purple
  new Palette("#55566a", "#FFFFFF", "#55566a", "#55566a","#55566a", scheme),
  new Palette("#FFFFFF", "#55566a", "#ffffff", "#ffffff","#EEEEEE", scheme).saturated(true),

  // Red
  new Palette("#c9526a", "#FFFFFF", "#c9526a", "#c9526a","#c9526a", scheme).mood(Moods.Negative),
  new Palette("#FFFFFF", "#c9526a", "#FFFFFF", "#FFFFFF","#EEEEEE", scheme).saturated(true),

  // Green
  new Palette("#697b7f", "#FFFFFF", "#697b7f", "#697b7f","#697b7f", scheme).mood(Moods.Positive),
  new Palette("#FFFFFF", "#697b7f", "#FFFFFF", "#FFFFFF","#EEEEEE", scheme).saturated(true),

  // Blue
  new Palette("#636e8e", "#FFFFFF", "#636e8e", "#636e8e","#636e8e", scheme),
  new Palette("#FFFFFF", "#636e8e", "#FFFFFF", "#FFFFFF","#EEEEEE", scheme).saturated(true),

];

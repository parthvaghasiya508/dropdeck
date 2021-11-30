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

  // Accent, BG, H1, H2, text

  // Default
  new Palette("#0055dd", "#fff", "#1e2023", "#1e2023","#48494a", scheme),

  // Increased contrast w/ navy headings.
  new Palette("#93b1ce", "#f5f8fb", "#0f2741", "#455f7c","#455f7c", scheme),
  new Palette("#93b1ce", "#0f2741", "#93b1ce", "#f5f8fb","#ffffff", scheme).saturated(true),

  // Dark grey H2 (accent) / warm grey BG (background) / grey H1 (primary) / Med grey text (text)
  new Palette("#4e4e4e", "#f6f6f4", "#000000", "#000000","#414141"), // light grey

  // Color H2 (accent) / White BG (background) / Dark grey H1 (primary) / Med grey text (text)
  new Palette("#66BBFF", "#ffffff", "#66BBFF", "#66BBFF","#0e3f1a"), // blue
  new Palette("#30d158", "#ffffff", "#30d158", "#30d158", "#0e3f1a").mood(Moods.Positive), // green
  new Palette("#ffcc00", "#ffffff", "#ffcc00", "#ffcc00","#0e3f1a"), // yellow
  new Palette("#ff3b30", "#ffffff", "#ff3b30", "#ff3b30","#0e3f1a").mood(Moods.Negative), // red

  // White H2 (accent) / Block Color BG (background) / Dark grey H1 (primary) / Med grey text (text)
  new Palette("#00314a", "#66BBFF", "#ffffff", "#ffffff","#ffffff").saturated(true), // blue
  new Palette("#00300d", "#30d158", "#ffffff", "#ffffff","#ffffff").saturated(true).mood(Moods.Positive), // green
  new Palette("#000000", "#ffcc00", "#000000", "#000000","#0e3f1a").saturated(true), // yellow
  new Palette("#340101", "#ff3b30", "#ffffff", "#ffffff","#ffffff").saturated(true).mood(Moods.Negative), // red
];

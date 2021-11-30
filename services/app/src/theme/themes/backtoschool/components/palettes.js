import Palette, { Moods } from "../../../Palette";

const scheme = [
  "#EC1009",
  "#3C23AA",
  "#8AFA82",
  "#FFF500",
  "#FF5AD1",
  "#00B1EE",
];

// Accent, BG, H1, H2, Text
export const getPalettes = () => [
  new Palette("#1dbdf4", "#f4f6f6", "#005BBE", "#1dbdf4","#000000CC", scheme, "/themes/b2s/theme-b2s-bg4.png"), // blue
  new Palette("#24c164", "#f4faf1", "#0d9242", "#24c164","#000000CC", scheme, "/themes/b2s/theme-b2s-bg3.png").mood(Moods.Positive), // green
  new Palette("#ff83b5", "#fff9f7", "#dc2e76", "#ff83b5","#000000CC", scheme, "/themes/b2s/theme-b2s-bg1.png"), // red
  new Palette("#a164ff", "#fffdf3", "#6644b9", "#a164ff","#000000CC", scheme, "/themes/b2s/theme-b2s-bg2.png"), // purple

  new Palette("#005BBE", "#1dbdf4", "#111111CC", "#005BBE", "#ffffff", scheme, "/themes/b2s/theme-b2s-bg4.png"), // blue bg
  new Palette("#11773a", "#24c164", "#111111CC", "#11773a", "#ffffff", scheme, "/themes/b2s/theme-b2s-bg3.png").mood(Moods.Positive), // green bg
  new Palette("#ff83b5", "#dc2e76", "#111111CC", "#ff83b5", "#ffffff", scheme, "/themes/b2s/theme-b2s-bg1.png"), // red bg
  new Palette("#d69eff", "#9e60ff", "#111111CC", "#d69eff", "#ffffff", scheme, "/themes/b2s/theme-b2s-bg2.png"), // purple bg
];

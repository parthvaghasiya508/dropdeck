import Palette from "../../../Palette";

const scheme = [
  '#ff00ff',
  '#ffff00',
  '#00ffff',
  '#7394ff',
  '#0affd9',
  '#b9b919',
  '#00caff',
  '#6effa3',
  '#78771b',
  '#00eaff',
  '#b7ff63',
  '#3d3b15',
  '#000000'
];

// Accent - Background - Heading 1 - Heading 2 - TextQuote

export const getPalettes = () => [
  new Palette("#4c3feb", "#ffffff", "#4c3feb", "#4c3feb", "#3b3f49", scheme), // White bg / Azure titles 
  new Palette("#00ffcc", "#4c3feb", "#00ffcc", "#00ffcc", "#ffffff", scheme), // Azure bg / Mint titles 
  new Palette("#007788", "#ffffff", "#007788", "#007788", "#3b3f49", scheme), // White bg / Snooker titles
  new Palette("#A4FF44", "#006775", "#A4FF44", "#A4FF44", "#ffffff", scheme), // Snooker bg / Citron titles
  new Palette("#FF8F00", "#ffffff", "#FF8F00", "#FF8F00", "#3b3f49", scheme), // Orange bg / Purple titles
  new Palette("#FFA805", "#57249F", "#FFA805", "#FFA805", "#ffffff", scheme), // Purple bg / Orange titles 
  new Palette("#e80268", "#ffffff", "#e80268", "#e80268", "#3b3f49", scheme), // White bg / Pink titles
  new Palette("#ffffff", "#e80268", "#ffffff", "#ffffff", "#ffffff", scheme), // Pink bg / White titles
  new Palette("#333740", "#ffffff", "#333740", "#333740", "#585d6d", scheme), // Sleet
  new Palette("#848fa2", "#3b3f49", "#ffffff", "#ffffff", "#d8d9db", scheme), // Slate
  new Palette("#ffffff", "#101010", "#ffffff", "#ffffff", "#ffffff", scheme), // Coal
];

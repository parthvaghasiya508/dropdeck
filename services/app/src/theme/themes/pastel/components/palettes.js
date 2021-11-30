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
  new Palette("#f8b387", "#ffffff", "#f68a4c", "#f68a4c", "#1d1e20", scheme), // Apricot (white bg)
  new Palette("#f8b387", "#fdf1d9", "#f68a4c", "#f68a4c", "#1d1e20", scheme), // Apricot
  new Palette("#8abaa6", "#ffffff", "#579994", "#579994", "#1d1e20", scheme), // Apple (white bg)
  new Palette("#8abaa6", "#d9e9c4", "#579994", "#579994", "#1d1e20", scheme), // Apple
  new Palette("#6b93b9", "#ffffff", "#3870a1", "#3870a1", "#1d1e20", scheme), // Blueberry (white bg)
  new Palette("#6b93b9", "#dce5f1", "#3870a1", "#3870a1", "#1d1e20", scheme), // Blueberry
  new Palette("#af97cd", "#ffffff", "#5b52ac", "#5b52ac", "#1d1e20", scheme), // Plum (white bg)
  new Palette("#af97cd", "#edcbd9", "#5b52ac", "#5b52ac", "#1d1e20", scheme), // Plum
  new Palette("#ff9797", "#ffffff", "#d6544b", "#d6544b", "#1d1e20", scheme), // Strawberry (white bg)
  new Palette("#ff9797", "#fddedd", "#d6544b", "#d6544b", "#1d1e20", scheme), // Strawberry
  new Palette("#87878c", "#ffffff", "#1d1d1f", "#424242", "#424242", scheme), // Grey
];

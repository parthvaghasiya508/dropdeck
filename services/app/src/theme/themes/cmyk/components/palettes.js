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

export const getPalettes = () => [
  new Palette("#000", "#fff", "#000", "#000","#000", scheme),
  new Palette("#fff", "#ff00ff", "#fff", "#fff","#fff").saturated(true),
  new Palette("#000", "#00ffff", "#000", "#000","#000").saturated(true),
  new Palette("#000", "#ffff00", "#000", "#000","#555").saturated(true),
  new Palette("#fff", "#000", "#fff", "#fff","#fff").saturated(true),
];

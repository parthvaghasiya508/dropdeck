import Palette, { Moods } from "../../../Palette";

const schemeRedBlack = ["#fff", "#fdd4d3", "#FBA8A7", "#F87D7C", "#C04645", "#8B3A39", "#572E2E", "#222",];
const schemeBlueYellow = ["#FEFCD2", "#E9EDCB", "#D2DCC3", "#BBCCBB", "#A6BCB3", "#91ADAC", "#7B9DA4", "#648C9C",];
const schemeBluePink = ["#F2ACBC", "#DEA6B7", "#C9A0B2", "#B59AAD", "#A094A9", "#8C8FA4", "#78899F", "#63839A",];
const schemeGreenYellow = ["#FEFCD2", "#E7EEC7", "#CFDEBC", "#B7CEB0", "#A0C0A5", "#89B29B", "#71A28F", "#599284",];
const schemeCamo = ["#F0C462", "#E1BB63", "#D1B165", "#C1A767", "#B29E68", "#A49569", "#948C6B", "#84826D",];

export const getPalettes = () => [
  // H2 & Highlight / slide BG / H1 / Text
  new Palette("#4f7d95", "#ffffff", "#4f7d95", "#4f7d95","#222222", schemeBluePink), // white bg blue title
  new Palette("#f2acbc", "#4f7d95", "#f2acbc", "#f2acbc","#f6fcff", schemeBluePink).saturated(true), // pink & blue

  new Palette("#222222", "#ffffff", "#428479", "#428479","#222222", schemeGreenYellow).mood(Moods.Positive), // white bg green title
  new Palette("#222222", "#428479", "#222222", "#222222","#ffffff", schemeGreenYellow).saturated(true), // green bg white title

  new Palette("#222222", "#ffffff", "#f55250", "#f55250","#222222", schemeRedBlack).mood(Moods.Negative), // white bg red title
  new Palette("#222222", "#f55250", "#222222", "#222222","#ffffff", schemeRedBlack).saturated(true).mood(Moods.Negative), // red bg white title

  new Palette("#d0af64", "#75796e", "#d0af64", "#d0af64","#ffffff", schemeCamo).saturated(true), // Camo
  new Palette("#fffcd2", "#183c4c", "#fffcd2", "#fffcd2","#ffffff", schemeBlueYellow).saturated(true), // blue & yellow

];

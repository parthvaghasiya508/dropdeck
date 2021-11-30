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

  // Accent / BG / H1 / H2 / Text

  // Grey Blue (Internet Bank / App)
  new Palette("#5a7aee", "#ededf0", "#292f36", "#5a7aee", "#292f36", scheme, "/themes/curve/curve-bg-light.svg"),
  new Palette("#5a7aee", "#0d2540", "#ffffff", "#5a7aee", "#ededf0", scheme, "/themes/curve/curve-bg-dark.svg").saturated(true),

  new Palette("#74ab59", "#ffffff", "#394c32", "#74ab59", "#394c32", scheme, "/themes/curve/curve-bg-light-green.svg").mood(Moods.Positive),
  new Palette("#74ab59", "#394c32", "#ffffff", "#74ab59", "#ededf0", scheme, "/themes/curve/curve-bg-dark-green.svg").saturated(true),

  new Palette("#ec563c", "#ffead2", "#292f36", "#ec563c", "#292f36", scheme, "/themes/curve/curve-bg-light-red.svg"),
  new Palette("#ffe2bd", "#e8371e", "#ffffff", "#ffe2bd", "#ffffff", scheme, "/themes/curve/curve-bg-dark-red.svg").saturated(true).mood(Moods.Negative),

];

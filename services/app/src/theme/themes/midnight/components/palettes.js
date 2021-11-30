import Palette, { Moods } from "../../../Palette";

export const getPalettes = () => [

  new Palette("#ffffff", "#1d1d20", "#ffffffbb", "#ffffffbb","#ffffffbb"),

  // Colour H1 (accent) / Dark grey BG (background) / White H2 (primary) / L Grey text (text)
  new Palette("#66BBFF", "#1d1d20", "#fff", "#fff","#c7c7cc", { scheme: 'blues' }).saturated(true), // blue
  new Palette("#30d158", "#1d1d20", "#fff", "#fff","#c7c7cc", { scheme: 'greens' }).saturated(true).mood(Moods.Positive), // green
  new Palette("#ffcc00", "#1d1d20", "#fff", "#fff","#c7c7cc", { scheme: 'yellow_orange_red' }).saturated(true), // yellow
  new Palette("#ff3b30", "#1d1d20", "#fff", "#fff","#c7c7cc", { scheme: 'reds' }).saturated(true).mood(Moods.Negative), // red
];

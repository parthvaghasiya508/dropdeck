import Palette, { Moods } from "../../../Palette";

const schemeBroadsheet = ["#052962", "#5000cd", "#29dce1", "#226949", "#61b64d", "#DF1A23", "#fff14a", "#eceff1", "#202020",];
const schemeBroadsheetLighten = ["#e6484f", "#fff36f", "#edeff1", "#385482", "#7334d7", "#52e3e7", "#4e886d", "#81c572", "#202020",];

export const getPalettes = () => [

  // H2 & Highlight / slide BG / H1 / Text
  new Palette("#DF1A23", "#FFFFFF", "#202020", "#202020","#000000", schemeBroadsheet), //    Slate Accent   •   White BG     •   Red Headlines   •   Black Text

  //  Economist
  new Palette("#202020", "#DF1A23", "#FFFFFF", "#FFFFFF","#FFFFFF", schemeBroadsheetLighten).saturated(true).mood(Moods.Negative), //    White Accent   •   Red BG     •   White Headlines   •   White Text
  new Palette("#DF1A23", "#202020", "#FFFFFF", "#FFFFFF","#FFFFFFBB", schemeBroadsheetLighten).saturated(true), //    Red Accent     •   Slate BG   •   White Headlines   •   Grey Text
  //  Guardian
  new Palette("#BF9F72", "#FFFFFF", "#052962", "#052962","#000000", schemeBroadsheet), //    Gold Accent   •   White BG  •   Navy Headlines    •   Black Text
  new Palette("#BF9F72", "#052962", "#FFFFFF", "#FFFFFF","#FFFFFF", schemeBroadsheetLighten).saturated(true), //    Gold Accent   •   Navy BG   •   White Headlines   •   White Text
  new Palette("#052962", "#BF9F72", "#FFFFFF", "#FFFFFF","#000000", schemeBroadsheetLighten).saturated(true), //    Navy Accent   •   Gold BG   •   White Headlines   •   Black Text
  // USA Today
  new Palette("#202020", "#FFFFFF", "#009bff", "#009bff","#202020", schemeBroadsheet), //    Black Accent    •   White BG  •   Sky Headlines    •   Slate Text
  new Palette("#202020", "#009bff", "#FFFFFF", "#FFFFFF","#202020", schemeBroadsheetLighten).saturated(true), //    Black Accent    •   Sky BG    •   White Headlines  •   Black Text
  new Palette("#009bff", "#202020", "#FFFFFF", "#FFFFFF","#FFFFFF", schemeBroadsheetLighten).saturated(true), //    Sky Accent      •   Black BG  •   White Headlines  •   White Text
  // Green
  new Palette("#61b64d", "#FFFFFF", "#226949", "#226949","#000000", schemeBroadsheet), //    Lime Accent   •   White BG  •   Grass Headlines    •   Black Text
  new Palette("#61b64d", "#226949", "#FFFFFF", "#FFFFFF","#FFFFFF", schemeBroadsheetLighten).saturated(true).mood(Moods.Positive), //    Lime Accent   •   Grass BG   •   White Headlines   •   White Text
  // FT
  new Palette("#202020", "#fff1e5", "#990f3d", "#990f3d","#202020", schemeBroadsheet), //    DSalmon Accent   •   Salmon BG   •   Brick Headlines   •   Slate Text
  new Palette("#BF9F72", "#990f3d", "#FFFFFF", "#FFFFFF","#f2dfce", schemeBroadsheetLighten).saturated(true), //    White Accent     •   Brick BG    •   White Headlines  •   White Text
];

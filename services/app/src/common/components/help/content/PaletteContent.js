import React from "react";
import BrushIcon from "@material-ui/icons/Brush";
import PaletteIcon from "@material-ui/icons/Palette";
import Content from "./Content";

const PaletteContent = () => (
  <Content>
    <div className="contentWrapper">
      <div className="description">
        <h5>DESIGN<BrushIcon/></h5>
        <h2>Slide Colors</h2>
        <p>Dropdeck automatically extracts color palettes from slide images. Take a look by hovering any slide in the gallery preview and opening the palette popover <PaletteIcon/>.</p>
      </div>
      <div className="imgOuter palette" />
    </div>
  </Content>
);
export default PaletteContent;

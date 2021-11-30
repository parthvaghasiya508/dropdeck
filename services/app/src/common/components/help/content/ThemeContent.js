import React from "react";
import BrushIcon from "@material-ui/icons/Brush";
import Content from "./Content";

const PaletteContent = () => (
  <Content>
    <div className="contentWrapper">
      <div className="description">
        <h5>DESIGN<BrushIcon/></h5>
        <h2>Go for a different style!</h2>
        <p>Give your slidedeck a complete make-over by choosing a different &quot;theme&quot;. Dropdeck&apos;s growing theme library can be found in the flyout menu at the top right of your slide preview.</p>
      </div>
      <div className="imgOuter theme" />
    </div>
  </Content>
);
export default PaletteContent;

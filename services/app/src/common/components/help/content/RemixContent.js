import React from "react";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ReplayIcon from "@material-ui/icons/Replay";
import Content from "./Content";

const RemixContent = () => (
  <Content>
    <div className="contentWrapper">
      <div className="description">
        <h5>LAYOUT<RotateRightIcon/></h5>
        <h2>Remixing Slides</h2>
        <p>
          To change the visual focus of a slide, hover over it in the gallery preview and
          remix <ReplayIcon/><ReplayIcon/> to switch up the overall layout.
        </p>
      </div>
      <div className="imgOuter remix" />
    </div>
  </Content>
);
export default RemixContent;

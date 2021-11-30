import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { MagicWand } from "./components/MagicWand";

const SlideToolbar = ({
  show,
  handleClick,
  drawerOpen,
  remixName,
  slide,
  shiftRemix,
  classes,
  style,
  themeName
}) => {
  const [animationClass, setAnimationClass] = useState("");

  return (
    <div>
      <div className={`${classes.root} ${show ? "hoverPanel" : ""} ${animationClass}`} style={style}>
        <IconButton style={{ marginRight: 5 }} onClick={() => shiftRemix(slide, remixName, -1, themeName)} disabled={slide.matchingRemixes.length <= 1}>
          <ArrowBackIos style={{ height: 14, width: 14, marginRight: -2, marginLeft: 2 }}/>
        </IconButton>
        <MagicWand setAnimationClass={setAnimationClass} handleClick={handleClick} drawerOpen={drawerOpen} />
        <IconButton style={{ marginLeft: 5 }} onClick={() => shiftRemix(slide, remixName, 1, themeName)} disabled={slide.matchingRemixes.length <= 1}>
          <ArrowForwardIos style={{ height: 14, width: 14 }}/>
        </IconButton>
      </div>
    </div>
  );
};
export default SlideToolbar;

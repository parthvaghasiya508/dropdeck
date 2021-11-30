import React from "react";
import { fontSizeFromWidth } from "../Lightbox/components/LightboxSlide/queries/fontSizeFromWidth";
import { DEFAULT_SCALING } from "./scalingLimits";

export const SlideLogoContainer = ({ slideWidth }) => (
  <div style={{ fontSize: fontSizeFromWidth(slideWidth, DEFAULT_SCALING) }} className="deck-logo-container">
    <div className="deck-logo-container-inner" />
  </div>
);

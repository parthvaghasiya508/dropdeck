import React from "react";
import Slide from "../../Slide";
import { remixStyleClassNames } from "../../../queries/buildCombinedSlideStyles";

export const SlidePlayerWithTheme = ({ SlideTheme, aspect, ready, slideWidth, slide, themePackage, branding, slideClasses }) => (
  <SlideTheme slideWidth={slideWidth}>
    <div className={remixStyleClassNames(slideClasses)} style={{ height: "100%" }}>
      <div key={`slide-wrapper-${slide.id}`} style={{ height: "100%", opacity: ready ? 1 : 0 }}>
        <Slide
          aspect={aspect}
          key={`slide-${slide.id}`}
          theme={themePackage.component}
          branding={themePackage.component.branded ? branding : undefined}
          slide={slide}
          className={slideClasses.slideRoot}
          paletteOverrideClasses={slideClasses}
        />
      </div>
    </div>
  </SlideTheme>
);

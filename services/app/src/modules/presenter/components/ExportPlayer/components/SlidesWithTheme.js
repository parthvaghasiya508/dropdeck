import React from "react";
import SlideContainer from "../../Slide/SlideContainer";
import { remixStyleClassNames } from "../../../queries/buildCombinedSlideStyles";

export const SlidesWithTheme = ({ dimensions, slideWidth, slides, branding, slideClasses, monitor, themePackage, aspect }) => {
  const SlideTheme = themePackage.component.wrap;
  const themeClass = themePackage && themePackage.component;
  return (
    <SlideTheme slideWidth={slideWidth} monitor={monitor}>
      <div className={remixStyleClassNames(slideClasses)} style={{ height: "100%" }}>
        {slides ? slideComponents(slides, themeClass, branding, slideClasses, aspect, dimensions) : null}
      </div>
    </SlideTheme>
  );
};

const slideComponents = (slides, themeClass, branding, slideClasses, aspect, dimensions) => slides.map((slide, index) => (
  <SlideContainer
    fixedDimensions={dimensions}
    aspect={aspect}
    key={`slide-${slide.id}`}
    theme={themeClass}
    branding={themeClass.branded && branding}
    slide={slide}
    paletteOverrideClasses={slideClasses}
    className={`page ${slideClasses.slideRoot}`} />
));

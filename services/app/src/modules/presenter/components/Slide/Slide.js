import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useDimensions from "react-cool-dimensions";
import { toMarkupElements } from "./builder/toMarkupElements";
import { chooseRemix } from "../../../../common/slide/transforms/chooseRemix";
import { slidePaletteClassName } from "../Lightbox/components/LightboxSlide/queries/getThemeRemixPaletteOverride";
import { calculateSlideSize } from "../../../../common/util/ScreenSizeUtils";
import { SlideDimensionsContext } from "./context/SlideDimensionsContext";
import { RemixEngine } from "../../../../common/remix/RemixEngine";
import { fontScalingClassName } from "./fontScalingStyles";
import { slideContainerClassNames } from "./queries/slideContainerClassNames";
import { logger } from "../../../../common/util/logger";
import { SlideLogoContainer } from "./SlideLogoContainer";
import { calculateScaling } from "../Lightbox/components/LightboxSlide/queries/calculateScaling";
import { resetFontScalingEffect } from "../Lightbox/components/LightboxSlide/effects/resetFontScalingEffect";
import { calculateScalingEffect } from "../Lightbox/components/LightboxSlide/effects/calculateScalingEffect";
import { hashForSlide } from "../Lightbox/queries/hashForSlide";
import { usePlayerId } from "../../../composer/hooks/usePlayerId";

/**
 * A Slide combines all the components for a given slide. It does not apply a theme.
 */
export default function Slide({
  aspect,
  slide,
  className,
  remixName,
  theme,
  paletteOverrideClasses,
  fixedDimensions,
}) {

  // eslint-disable-next-line prefer-const
  let { ref: resizeRef, width, height } = useDimensions();
  if (fixedDimensions !== undefined) {
    width = fixedDimensions.width;
    height = fixedDimensions.height;
    resizeRef = () => {}; // no-op ref
  }
  if (!remixName) {
    remixName = chooseRemix(slide);
  }
  const remix = RemixEngine.instance.get(remixName);

  const slideDimensions = calculateSlideSize(width, height, aspect);

  // elements that should be rendered on the slide
  const elements = (slide && slide.markup) ? toMarkupElements(slide) : [];

  if (!paletteOverrideClasses) {
    logger.error(`No palette override classes - this should not happen!`);
  }

  // --------------------------------------
  // FONT SCALING
  // --------------------------------------

  const [scalingLastModified, setScalingLastModified] = useState();
  const [fontScaling, setFontScaling] = useState(undefined);
  const [fontSize, setFontSize] = useState(0);
  const [needsCalculating, setNeedsCalculating] = useState(false);
  const scalingLevel = useMemo(() => fontScalingClassName(fontScaling, remix), [remixName, fontScaling]);
  const slideHash = hashForSlide(slide);
  const playerContext = usePlayerId();

  const calculateScalingRefs = useCallback(
    calculateScaling(
      slide,
      needsCalculating,
      setNeedsCalculating,
      fontScaling,
      setFontScaling,
      scalingLastModified,
      setScalingLastModified,
      slideDimensions?.width,
      fontSize,
      setFontSize,
      remix,
    ),[slideHash, fontScaling, setFontScaling, scalingLastModified, setScalingLastModified, slideDimensions?.width, fontSize, needsCalculating, remixName]
  );

  // Reset the font scaling when the slide changes (content or width, or both).
  useEffect(resetFontScalingEffect({
    scalingFactor: fontScaling,
    slide,
    width: slideDimensions?.width,
    calculateFontScaling: true,
    scalingLastModified,
    setNeedsCalculating,
    needsCalculating,
    setScalingFactor: setFontScaling,
    setScalingLastModified,
    setFontSize,
    remix,
  }), [slideHash, slideDimensions?.width, remixName]);

  // Calculate slide overflow for scaling.
  useLayoutEffect(calculateScalingEffect({
    calculateFontScaling: true,
    slide,
    remix,
    calculateScalingRefs,
    playerContext,
  }));

  // --------------------------------------
  // RENDERING
  // --------------------------------------

  const aggregateSlideWrapperClassName = `${className} ${slidePaletteClassName(slide, theme, remixName)}`;
  const aggregateSlideClassName = `${slideContainerClassNames(slide, theme, remixName)} ${scalingLevel}`;

  // We define a wrapper with a fixed width and height around the main .slide
  // container. This is so that the padding applied to the .slide will be correctly
  // calculated to the aspect ratio of the slide (without this, the padding was
  // calculated as a percentage of the overall window width).
  const slideWrapperStyling = {
    margin: "auto",
    display: "flex",
    width: slideDimensions.width,
    height: slideDimensions.height,
  };
  const slideContainerStyling = {
    margin: "auto",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  };

  return (
    <SlideDimensionsContext.Provider value={slideDimensions}>
      <div ref={resizeRef} className={aggregateSlideWrapperClassName} style={{ fontSize, height: "100%", display: "flex" }}>
        <div style={slideWrapperStyling}>
          <div className={aggregateSlideClassName} style={slideContainerStyling}>
            <SlideLogoContainer slideWidth={slideDimensions.width} />
            {elements}
            <div className="hook" />
          </div>
        </div>
      </div>
    </SlideDimensionsContext.Provider>
  );
}

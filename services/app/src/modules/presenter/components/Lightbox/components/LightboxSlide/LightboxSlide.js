import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import useDimensions from "react-cool-dimensions";
import { slidePaletteClassName } from "./queries/getThemeRemixPaletteOverride";
import { MIN_SCALING } from "../../../Slide/scalingLimits";
import { fixedAspectHeight } from "../../../Slide/queries/fixedAspectHeight";
import { calculateScaling } from "./queries/calculateScaling";
import { chooseRemix } from "../../../../../../common/slide/transforms/chooseRemix";
import { logger } from "../../../../../../common/util/logger";
import { hashForSlide } from "../../queries/hashForSlide";
import { SlideDimensionsContext } from "../../../Slide/context/SlideDimensionsContext";
import EditableSlideMarkupBuilder from "./markup/EditableSlideMarkupBuilder";
import { RemixEngine } from "../../../../../../common/remix/RemixEngine";
import SlideMarkupBuilder from "../../../Slide/builder/SlideMarkupBuilder";
import { fontScalingClassName } from "../../../Slide/fontScalingStyles";
import { slideContainerClassNames } from "../../../Slide/queries/slideContainerClassNames";
import { IMAGE_DROP_TARGET } from "../../../../../composer/components/DeckEditor/modules/plugins/component/media/components/ImageComponent/ImageComponent";
import { SlideLogoContainer } from "../../../Slide/SlideLogoContainer";
import { lightboxSlideStyles } from "./LightboxSlide.styles";
import { resetFontScalingEffect } from "./effects/resetFontScalingEffect";
import { calculateScalingEffect } from "./effects/calculateScalingEffect";
import { useSlideDropzone } from "./hooks/useSlideDropzone";

/**
 * A Slide combines all the components for a given slide. It does not apply a theme. In the Lightbox, the Slide component
 * takes care of calculating slide overflow and resizing the font scaling used on the slide (and this gets written back
 * to the content state).
 */
export default function LightboxSlide({
  readOnly = false,
  aspect,
  branding,
  slide,
  className,
  remixName,
  width: fixedWidth,
  theme,
  paletteOverrideClasses,
  operations = {},
  slideIndex,
  clickable = false,
  style = {},
}) {

  const {
    focusOnClick,
    getHoverPath,
    swapElements,
    onImageDrop,
    editor,
  } = operations;

  let { ref: resizeRef, width } = useDimensions();
  if (fixedWidth) {
    resizeRef = () => {}; // no-op ref
    width = fixedWidth;
  }

  const [slideOverlay, setSlideOverlay] = useState(false);
  const [addImageToSlide, setAddImageToSlide] = useState(true);
  const [hoverPath, setHoverPath] = useState([]);

  const overlayStyles = useCallback(lightboxSlideStyles(), []);
  const classes = overlayStyles();
  const onDrop = swapElements;

  if (!remixName) {
    remixName = chooseRemix(slide);
  }
  const remix = RemixEngine.instance.get(remixName);
  const markupBuilder = readOnly ? new SlideMarkupBuilder() : new EditableSlideMarkupBuilder(onDrop, remix, editor);
  const slideHash = hashForSlide(slide);
  const slideDimensions = {
    width,
    height: fixedAspectHeight(width, aspect),
  };

  const onHoverElement = (evt, path, sequence) => {
    const hoverPath = getHoverPath(evt, path, sequence);
    setHoverPath(hoverPath);
  };

  // elements that should be rendered on the slide
  const elements = (slide !== undefined && slide.markup !== undefined) ?
    markupBuilder.build(
      slide,
      focusOnClick !== undefined ? focusOnClick(slideIndex) : undefined,
      getHoverPath !== undefined ? onHoverElement : undefined
    ) : [];

  if (!paletteOverrideClasses) {
    logger.error(`No palette override classes - this should not happen!`);
  }

  const removeHoverFromImages = () => {
    const slideImages = document.getElementsByClassName(IMAGE_DROP_TARGET);
    for (let i = 0; i < slideImages.length; i++) {
      slideImages[i].classList.remove('hover');
    }
  };

  const { getRootProps } = useSlideDropzone({
    slide,
    setSlideOverlay,
    onImageDrop,
    addImageToSlide,
    hoverPath,
    removeHoverFromImages,
    setAddImageToSlide,
  });
  const dragProps = !readOnly ? getRootProps() : {};

  // --------------------------------------
  // FONT SCALING
  // --------------------------------------

  const [scalingLastModified, setScalingLastModified] = useState();
  const [scalingFactor, setScalingFactor] = useState(undefined);
  const [fontSize, setFontSize] = useState(0);
  const [needsCalculating, setNeedsCalculating] = useState(false);
  const scalingLevel = useMemo(() => fontScalingClassName(scalingFactor, remix), [remixName, scalingFactor]);
  const hasOverflow = scalingFactor <= MIN_SCALING;

  const calculateScalingRefs = useCallback(
    calculateScaling(
      slide,
      needsCalculating,
      setNeedsCalculating,
      scalingFactor,
      setScalingFactor,
      scalingLastModified,
      setScalingLastModified,
      width,
      fontSize,
      setFontSize,
      remix,
    ),[slideHash, scalingFactor, scalingLastModified, setScalingLastModified, width, fontSize, needsCalculating, remixName]
  );

  // Reset the font scaling when the slide changes (content or width, or both).
  useEffect(resetFontScalingEffect({
    scalingFactor,
    slide,
    width,
    calculateFontScaling: true,
    scalingLastModified,
    setNeedsCalculating,
    needsCalculating,
    setScalingFactor,
    setScalingLastModified,
    setFontSize,
    remix,
  }), [slideHash, width, remixName]);

  // Calculate slide overflow for scaling.
  useLayoutEffect(calculateScalingEffect({
    calculateFontScaling: true,
    slide,
    remix,
    calculateScalingRefs,
  }));

  // --------------------------------------
  // RENDERING
  // --------------------------------------

  // const slidePaletteClass = useMemo(() => slidePaletteClassName(slide, theme), [slideHash, theme]);
  const aggregateSlideWrapperClassName = `${className} ${slidePaletteClassName(slide, theme, remixName)} ${slideOverlay ? classes.overlay : ''} slide-root`;
  const aggregateSlideClassName = `${slideContainerClassNames(slide, theme, remixName)}${hasOverflow ? ' overflow' : ''} ${scalingLevel}`;

  return (
    <SlideDimensionsContext.Provider value={slideDimensions}>
      <div ref={resizeRef} className={aggregateSlideWrapperClassName} style={{ ...style, fontSize, height: slideDimensions.height }} {...dragProps}>
        <div className={aggregateSlideClassName} style={{ cursor: clickable ? "pointer" : null }}>
          <SlideLogoContainer slideWidth={width} />
          {elements}
          <div className="hook" />
        </div>
      </div>
    </SlideDimensionsContext.Provider>
  );
}

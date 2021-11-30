import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTheme } from '@material-ui/styles';
import 'highlight.js/styles/default.css';
import debounce from "lodash.debounce";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from "react-dropzone";
import { useRouteMatch } from "react-router-dom";
import useDimensions from "react-cool-dimensions";
import smoothscroll from "smoothscroll-polyfill";
import { Slide } from "../../../../common/slide/Slide";
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";
import { remixStyleClassNames } from "../../queries/buildCombinedSlideStyles";
import SortableList from "./components/SortableList";
import { PalettesInUseContext } from "./context/PalettesInUseContext";
import { getPalettesInUse } from "./queries/getPalettesInUse";
import { hashForSlideStyles } from "./queries/hashForSlideStyles";
import { hideRemixPanels } from "./queries/hideRemixPanels";
import { useScrollToActiveSlide } from "./queries/useScrollToActiveSlide";
import { remixPreviewStyles } from "./remixPreviewStyles";
import { slideToolbarStyles } from "./slideToolbarStyles";
import { dropzoneSpec } from './transforms/dropzoneSpec';
import { lightboxSpacing, useLightboxStylesByZoom } from "./useLightboxStylesByZoom";
import { logger } from "../../../../common/util/logger";
import { makeStylesForSlides } from "../../queries/makeStylesForSlides";
import { slidesLastModified } from "./queries/slidesLastModified";

export const ACTIVE_SLIDE_CLASS = 'active-slide';
export const HOVERING_SLIDE_CLASS = 'hovering-slide';
export const LIGHTBOX_THEME_JSS_INDEX = 1;
export const LIGHTBOX_REMIXES_JSS_INDEX = 2;
export const LIGHTBOX_CONTAINER_ID = "lightbox";

const makeStylesForLightboxSlides = (slides, themeName, themePackage, branding, slideStyleHash) => {
  logger.trace(`Rebuilding Lightbox styles with hash ${slideStyleHash} and theme ${themeName}`);
  return makeStylesForSlides(slides, themeName, themePackage, {
    makeStyleOptions: { deterministic: true, meta: 'LightboxSlides', index: LIGHTBOX_REMIXES_JSS_INDEX },
    animate: false,
    branding,
  });
};

/**
 * {@link Lightbox} for showing slides when composing a presentation.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Lightbox = ({
  id,
  aspect,
  readOnly,
  isPhoneSize,
  slides,
  branding,
  cols,
  themeName,
  metadata = true,
  show,
  activeSlide,
  variant = 'elevation',
  square = false,
  themeClasses,
  operations = {},
  uploadProgress,
  append
}) => {

  const { moveSlide } = operations;
  const themePackage = ThemeFactory.instance.get(themeName, branding);

  // Avoid recomputing the slide "style hash" too often
  const lastModified = slidesLastModified(slides);
  const slideStyleHash = useMemo(() => hashForSlideStyles(slides, themeName), [lastModified]);

  // Prepare palette overrides for all slides to optimise JSS-in-CSS updates.
  const useSlideStyles = useMemo(() => makeStylesForLightboxSlides(slides, themeName, themePackage, branding, slideStyleHash), [slideStyleHash, themeName]);
  const slideClasses = useSlideStyles();
  const [scrolledSlide, setScrolledSlide] = useState();
  const [dropZoneIndex, setDropZoneIndex] = useState(-1);
  const [dropZonePosition, setDropZonePosition] = useState(-1);
  const [dropZoneInLightBox, setDropZoneInLightBox] = useState(false);
  const [droppedInside, setDroppedInside] = useState(false);
  const [lightboxWidth, setLightboxWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const useSlideToolbarStyles = useCallback(slideToolbarStyles(), []);
  const slideToolbarClasses = useSlideToolbarStyles();
  const useRemixPreviewStyles = useCallback(remixPreviewStyles(), []);
  const remixPreviewClasses = useRemixPreviewStyles();
  const useLightboxStyles = useCallback(useLightboxStylesByZoom(cols, readOnly, isPhoneSize), [cols]);
  const lightboxClasses = useLightboxStyles();

  const scrollToActiveSlide = useCallback(useScrollToActiveSlide(activeSlide, scrolledSlide, setScrolledSlide), [activeSlide, scrolledSlide]);
  const route = useRouteMatch();
  const getColumnCount = route.params.view && cols > 1 ? cols - 1 : cols;
  const { ref: resizeRef, width, entry } = useDimensions();
  const theme = useTheme();

  // Measure the overall with of the Lightbox, sans scroll bars.
  useEffect(() => {
    if (width > 0 && entry) {

      // The inner width of the Lightbox container is the overall width of the container,
      // minus the left and right side padding, and 2 x padding of the slides (to account
      // for the leftmost and rightmost slides).
      const lightboxPadding = theme.spacing(lightboxSpacing.padding.left + lightboxSpacing.padding.right);
      const slidePadding = theme.spacing(2 * lightboxSpacing.slide.padding);
      const widthPadding = lightboxPadding + slidePadding;
      const outerWidth = entry.target.clientWidth;
      const innerWidth = outerWidth - widthPadding;
      const slideWidth = ((outerWidth - lightboxPadding) / getColumnCount) - slidePadding;
      setLightboxWidth(innerWidth > 0 ? innerWidth : 0);
      setSlideWidth(slideWidth > 0 ? slideWidth : 0);
    }
  }, [width, cols]);

  // All palettes currently used in this deck.
  const palettesInUse = useMemo(() => getPalettesInUse(slides, themeName), [slides, themeName]);

  // Initialize polyfill
  useEffect(() => smoothscroll.polyfill(), []);

  // Scroll to the active slide but include a quick debounce to ensure we are not doing multiple scroll actions.
  useEffect(debounce(scrollToActiveSlide, 10));

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    moveSlide(slides, oldIndex, newIndex);
  };

  const helperContainerId = 'slide-sortable-container';
  const {
    getRootProps,
    draggedFiles,
    isDragActive
  } = useDropzone(
    dropzoneSpec(
      setDropZoneIndex,
      setDropZonePosition,
      setDropZoneInLightBox,
      setDroppedInside,
      getColumnCount,
      dropZoneIndex,
      slides,
      hideRemixPanels,
    )
  );

  const dropZoneProperties = {
    noOfFiles: draggedFiles.length,
    isDragActive,
    dropZoneIndex,
    dropZonePosition,
    dropZoneInLightBox,
    setDropZoneIndex,
    setDropZonePosition,
  };

  if (themePackage) {
    const SlideTheme = themePackage.component.wrapWithoutStyles;
    const lightboxSlides = [...(show ? slides.slice(0, show) : slides)];

    if (dropZoneIndex >= 0) {
      lightboxSlides.splice(dropZoneIndex, 0, {});
    }

    const lightBoxWithTheme = () => (
      <Box ref={resizeRef} height="100vh" overflow="auto">
        <PalettesInUseContext.Provider value={palettesInUse}>
          <SlideTheme view={Slide.View.LIGHTBOX} classes={themeClasses}>
            <div id={LIGHTBOX_CONTAINER_ID} className={lightboxClasses.lightbox} key="lightbox" {...getRootProps()}>
              <Grid id={helperContainerId} container style={{ paddingBottom: 120 }} className={remixStyleClassNames(slideClasses)}>
                <SortableList
                  key="sortable-list"
                  axis="xy"
                  useDragHandle
                  slides={lightboxSlides}
                  helperContainer={document.getElementById(helperContainerId)}
                  onSortEnd={handleSortEnd}
                  onSortStart={hideRemixPanels}
                  activeSlide={activeSlide}
                  lightboxClasses={lightboxClasses}
                  cols={getColumnCount}
                  showTutorial={slides.length < cols || slides.length < 3 && cols === 1}
                  deckId={id}
                  variant={variant}
                  aspect={aspect}
                  slideClasses={slideClasses}
                  branding={branding}
                  themePackage={themePackage}
                  themeClasses={themeClasses}
                  square={square}
                  remixPreviewClasses={remixPreviewClasses}
                  toolbarClasses={slideToolbarClasses}
                  metadata={metadata}
                  readOnly={readOnly}
                  dropZoneProperties={dropZoneProperties}
                  operations={operations}
                  uploadProgress={uploadProgress}
                  lightboxWidth={lightboxWidth}
                  slideWidth={slideWidth}
                  append={append}
                  droppedInside={droppedInside}
                  setDroppedInside={setDroppedInside}
                />
              </Grid>
            </div>
          </SlideTheme>
        </PalettesInUseContext.Provider>
      </Box>
    );

    if (themePackage.static) {
      return lightBoxWithTheme();
    }

    return (
      <Suspense fallback={<LinearProgress/>}>
        {lightBoxWithTheme()}
      </Suspense>
    );
  }

  // TODO Basically content is not ready?
  return null;
};
export default Lightbox;

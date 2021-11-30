import { IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import computeScrollIntoView from 'compute-scroll-into-view';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import useDimensions from "react-cool-dimensions";
import SwipeableViews from "react-swipeable-views";
import smoothscroll from 'smoothscroll-polyfill';
import GenericButtonGroup from "../../../../../../common/components/buttons/GenericButtonGroup";
import { buildCombinedSlideStyles, remixStyleClassNames } from "../../../../queries/buildCombinedSlideStyles";
import { PalettePopup } from "../PaletteSuggestionComponent/PaletteSuggestionComponent";
import Section from "../../../../../../common/components/popup/Section";
import { chooseRemix } from "../../../../../../common/slide/transforms";
import {
  getPaletteForSlide,
  getStoredPaletteForSlide
} from "../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { LIGHTBOX_REMIXES_JSS_INDEX } from "../../Lightbox";
import LightboxSlide from "../LightboxSlide/LightboxSlide";
import CustomiseColors from "./components/CustomiseColors";
import { slidesForPreview } from "./transforms/slidesForPreview";
import GenericButton from "../../../../../../common/components/buttons/GenericButton";
import { REMIX_SLIDE_WIDTH } from "../../remixPreviewStyles";
import { getPalettesSuggestionsForSlide } from "../PaletteSuggestionComponent/queries/getPalettesSuggestionsForSlide";

// Magic constant for calculating clientWidth offset
const CLIENT_WIDTH_OFFSET = 36;

// Padding plus the bit of margin to create the right spacing below and above the popup
const PADDING_ON_DRAWER = 20 + 6;

// Magic constant for calculating scrollWidth offset
const SCROLL_WIDTH_FACTOR = 1.01;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
};

const RemixPreview = ({
  width,
  slide,
  deckId,
  revert,
  close,
  setRemix,
  branding,
  themeClasses,
  pickPalette,
  themePackage,
  remixPreviewClasses,
  setRemixDrawerHeight,
  aspect
}) => {

  const themeClass = themePackage && themePackage.component;
  const SlideTheme = themeClass.wrapWithoutStyles;
  const themeName = themeClass && themeClass.id;

  const { matchingRemixes, settings } = slide;
  const [originalRemix] = useState(chooseRemix(slide));
  const [currentRemixName, setCurrentRemixName] = useState(originalRemix);

  // This is the palette choice the user _explicitly_ makes in this session.
  const [chosenPalette, setChosenPalette] = useState(undefined);

  // This is the palette originally chosen for this slide.
  const [originalPalette] = useState(getPaletteForSlide(themeName, settings, originalRemix));

  // This is the palette that is active either from an explicit choice or implicitly via remix.
  const [activePalette, setActivePalette] = useState(originalPalette);

  // This is the palette originally _stored_ for this slide.
  const [originalStoredPalette] = useState(getStoredPaletteForSlide(themeName, settings));

  const paletteHash = chosenPalette?.id();

  const changesInPreviewPanel = () => (chosenPalette !== undefined && (originalStoredPalette?.id() !== chosenPalette?.id())) || originalRemix !== currentRemixName;
  const [previewSlides, setPreviewSlides] = useState(null);
  const [previewSlidesHash, setPreviewSlidesHash] = useState(null);
  const [combinedSlideStyles, setCombinedSlideStyles] = useState({});

  // Palette suggestions.
  const suggestedPalettes = getPalettesSuggestionsForSlide(slide, themeClass);

  // Declare a polyfill for smooth scrolling.
  smoothscroll.polyfill();

  const { ref: topRef, height } = useDimensions();

  useEffect(() => {
    setRemixDrawerHeight(height + PADDING_ON_DRAWER);
  }, [height]);

  // Note: We need to ensure that the JSS index is higher (= more specific) than the Lightbox remix JSS.
  const useSlideStyles = useCallback(
    makeStyles(
      combinedSlideStyles,
      { deterministic: false, meta: 'RemixPreviewSlides', index: LIGHTBOX_REMIXES_JSS_INDEX + 1 }
    ), [previewSlidesHash]
  );
  const slideClasses = useSlideStyles();
  useEffect(() => {
    if (topRef && topRef.current) {
      const actions = computeScrollIntoView(topRef.current, {
        // scrollMode: "if-needed",
        block: 'start',
      });
      actions.forEach(({ el, top, left }) => {
        if (el.scrollTop < top) {
          el.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  }, [topRef]);

  // Set up the panel.
  useEffect(() => {
    const slides = slidesForPreview(slide, matchingRemixes, themeName, chosenPalette, originalStoredPalette, currentRemixName, deckId);
    const styles = buildCombinedSlideStyles(slides, themeName, themePackage, branding, false, false);

    setPreviewSlides(slides);
    setCombinedSlideStyles(styles);
    setPreviewSlidesHash(`slides-${new Date().getTime()}`);
  }, [paletteHash]);

  const [edge, setEdge] = useState(0);

  const refParent = useRef();
  const ref = useRef();

  const calculateEdgesAndSize = () => {
    if (!refParent) {
      setEdge(0);
      return;
    }
    if (refParent.current.clientWidth - CLIENT_WIDTH_OFFSET > ref.current.scrollWidth * SCROLL_WIDTH_FACTOR) {
      setEdge(-2);
    } else if (Math.round(ref.current.scrollLeft + ref.current.offsetWidth) === Math.round(ref.current.scrollWidth)) {
      setEdge(1);
    } else if (ref.current && ref.current.scrollLeft === 0) {
      setEdge(-1);
    } else {
      setEdge(0);
    }
  };

  // Set up scrolling when the width changes.
  useEffect(() => {
    const activeSlide = document.querySelector(`.${remixPreviewClasses.activeRemix}`);
    if (activeSlide && ref && ref.current && refParent && refParent.current) {
      ref.current.scrollTo({
        left: (activeSlide.offsetLeft - 45 - ((width - 200) / 2) + (Math.floor(width / 200) * 8)),
        behavior: "auto"
      });

      calculateEdgesAndSize();

      let isScrolling;
      ref.current.onscroll = (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          calculateEdgesAndSize();
        }, 66);
      };
    }
  }, [previewSlidesHash]); // sign that the panel is ready

  // Functions to update both the global value + local value.
  const revertChanges = () => {
    revert();
    setCurrentRemixName(originalRemix);
    setChosenPalette(originalStoredPalette);
    setActivePalette(originalStoredPalette);
  };

  const revertAndCancel = () => {
    revertChanges();
    close();
  };

  const setRemixCached = (s, remixName) => {
    setCurrentRemixName(remixName);
    setRemix(s, remixName, themeName);

    // Reset any stored palette if choosing a remix different from the original remix.
    const differentFromOriginalRemix = remixName !== originalRemix;
    if (!chosenPalette && originalStoredPalette) {
      if (differentFromOriginalRemix) {
        pickPalette(slide, themePackage.component.id, undefined);
      } else {
        pickPalette(slide, themePackage.component.id, originalStoredPalette);

      }
    }

    // Finally update the active palette, if implicitly defined.
    if (!chosenPalette) {

      const settingsWithNewRemix = {
        ...s.settings,
        remix: remixName,
        palettes: {}, // clear the palette choice
      };

      const newActivePalette = getPaletteForSlide(themeName, settingsWithNewRemix);
      if (newActivePalette) {
        setActivePalette(newActivePalette);
      }
    }
  };

  const setPaletteCached = (p) => {
    setChosenPalette(p);
    setActivePalette(p);
    pickPalette(slide, themePackage.component.id, p);
  };

  const pickPaletteCached = (s, themeName, p) => {
    setPaletteCached(p);
  };

  const scrollLeft = () => {
    ref.current.scrollBy({ left: width * -0.6, behavior: "smooth" });
  };
  const scrollRight = () => {
    ref.current.scrollBy({ left: width * 0.6, behavior: "smooth" });
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  const [selectedPaletteTab, setSelectedPaletteTab] = useState(0);

  const theme = useTheme();

  const WIDTH_PER_SLIDE_WITH_PADDING = REMIX_SLIDE_WIDTH + 16;
  return (
    <div ref={topRef}>
      { !previewSlides ? null : (
        <div key={`slide-preview-pane-${slide.id}`} className={remixPreviewClasses.root}>
          <Section>
            {previewSlides && previewSlides.length > 0 ? (
              <div ref={refParent} className={remixPreviewClasses.previewContainer}>
                <div className={`${remixPreviewClasses.paginateRemix}`}>
                  <IconButton color="primary" onClick={scrollLeft} size="small" disabled={(!ref || !ref.current) || edge === -1 || edge === -2}>
                    <KeyboardArrowLeft/>
                  </IconButton>
                </div>
                <div className={`${remixStyleClassNames(slideClasses)} ${remixPreviewClasses.container}`} ref={ref} style={{ overscrollBehaviorX: "contain" }}>
                  <div style={{ minWidth: "101%" }}>
                    <SlideTheme classes={themeClasses} style={{ width: previewSlides.length * WIDTH_PER_SLIDE_WITH_PADDING }}>
                      {previewSlides.map((s) => (
                        <div style={{ flexShrink: 0 }} key={s.id} tabIndex={0} className={`${remixPreviewClasses.wrapper} ${s.remix === currentRemixName ? remixPreviewClasses.activeRemix : ''}`} onClick={() => setRemixCached(slide, s.remix)} role="button">
                          <LightboxSlide readOnly aspect={aspect} theme={themeClass} branding={themeClass.branded && branding} slide={s} className={slideClasses.slideRoot} paletteOverrideClasses={slideClasses}/>
                        </div>
                      ))}
                    </SlideTheme>
                  </div>
                </div>
                <div className={`${remixPreviewClasses.paginateRemix}`}>
                  <IconButton color="primary" onClick={scrollRight} size="small" disabled={(!ref || !ref.current) || edge === 1 || edge === -2}>
                    <KeyboardArrowRight/>
                  </IconButton>
                </div>
              </div>
            ) : null}

            <SwipeableViews
              axis="x"
              index={tabValue}
              onChangeIndex={handleChangeIndex}>

              <TabPanel key={`preview-pane-palettes-${slide.id}`} value={tabValue} index={0} style={{ minHeight: 200, }}>
                <PalettePopup
                  width={width}
                  deckId={deckId}
                  theme={themeClass}
                  suggestedPalettes={suggestedPalettes}
                  slide={slide}
                  originalPalette={originalPalette}
                  currentPalette={activePalette}
                  pickPalette={pickPaletteCached}
                />
              </TabPanel>
              <TabPanel key={`preview-pane-colors-${slide.id}`} value={tabValue} index={1} style={{ minHeight: 262 }}>
                <CustomiseColors
                  slide={slide}
                  branding={branding}
                  width={width}
                  palette={activePalette}
                  setPalette={setPaletteCached}
                  selectedPaletteTab={selectedPaletteTab}
                  setSelectedPaletteTab={setSelectedPaletteTab}
                />
              </TabPanel>
            </SwipeableViews>

            {tabValue === 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between", padding: width < 500 ? 5 : "20px 30px 10px 30px" }}>
                <div>
                  <GenericButton secondary onClick={() => setTabValue(1)}>
                    {width < 500 ? "Colors" : "Customize Colors"}
                  </GenericButton>
                  <GenericButton conditional={width >= 500} onClick={revertChanges} disabled={!changesInPreviewPanel()} style={{ marginLeft: theme.spacing(1) }}>
                    Revert
                  </GenericButton>
                </div>
                <GenericButtonGroup>
                  <GenericButton onClick={revertAndCancel}>
                    Cancel
                  </GenericButton>
                  <GenericButton primary onClick={close}>
                    Done
                  </GenericButton>
                </GenericButtonGroup>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", padding: width < 500 ? 5 : "20px 30px 10px 30px" }}>
                <div>
                  <GenericButton secondary onClick={() => setTabValue(0)}>
                    Back
                  </GenericButton>
                  <GenericButton onClick={revertChanges} disabled={!changesInPreviewPanel()} style={{ marginLeft: theme.spacing(1) }}>
                    Revert
                  </GenericButton>
                </div>
                <GenericButtonGroup>
                  <GenericButton onClick={revertAndCancel}>
                    Cancel
                  </GenericButton>
                  <GenericButton primary onClick={close}>
                    Done
                  </GenericButton>
                </GenericButtonGroup>
              </div>
            )}
          </Section>
        </div>
      )}
    </div>
  );
};
export default RemixPreview;

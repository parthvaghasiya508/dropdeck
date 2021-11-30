import React, { Suspense, useCallback, useMemo, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import 'swiper/swiper.scss';
import uuid from "react-uuid";
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";
import { getSlideWidthFromBoundingRect } from "../../transforms/getSlideWidthFromBoundingRect";
import { generateSlide } from "../../../../common/slide/SlideFactory";
import { ProgressTracker } from "../../../../common/util/ProgressTracker";
import { SlidePlayerWithTheme } from "./components/SlidePlayerWithTheme";
import { Slide } from "../../../../common/slide";
import { makeStylesForSlides } from "../../queries/makeStylesForSlides";
import { useDeckId } from "../../../composer/hooks/useDeckId";
import { PlayerContext } from "../../../composer/hooks/usePlayerId";

const Cover = ({ node, themeName, branding, aspect, view = Slide.View.FULL }) => {

  const deckId = useDeckId();
  const [ready, setReady] = useState(false);
  const monitor = new ProgressTracker(() => {
    if (!ready) {
      setReady(true);
    }
  });

  const slide = generateSlide(node, deckId, undefined, view, themeName, monitor);
  const themePackage = ThemeFactory.instance.get(themeName, branding);
  const SlideTheme = themePackage.component.wrap;

  // Prepare palette overrides for all slides to optimise JSS-in-CSS updates.
  const useSlideStyles = useMemo(() => makeStylesForSlides(slide, themeName, themePackage, { branding, animate: false }), [slide, themePackage]);
  const slideClasses = useSlideStyles();

  const [slideWidth, setSlideWidth] = useState(0);
  const ref = useCallback(getSlideWidthFromBoundingRect(setSlideWidth), [slideWidth]);
  const playerId = useMemo(() => `player-${uuid()}`, []);

  if (!themePackage.static) {
    return (
      <div id={playerId} ref={ref} style={{ position: "relative", height: "100%" }}>
        <Suspense fallback={<LinearProgress/>}>
          <PlayerContext.Provider value={playerId}>
            <SlidePlayerWithTheme
              ready={ready}
              aspect={aspect}
              branding={branding}
              slide={slide}
              slideClasses={slideClasses}
              SlideTheme={SlideTheme}
              slideWidth={slideWidth}
              themePackage={themePackage}
            />
          </PlayerContext.Provider>
        </Suspense>
      </div>
    );
  }

  return (
    <div id={playerId} ref={ref} style={{ height: "100%" }}>
      <Suspense fallback={<LinearProgress/>}>
        {slideWidth > 0 ? (
          <PlayerContext.Provider value={playerId}>
            <SlidePlayerWithTheme
              ready={ready}
              branding={branding}
              slide={slide}
              slideClasses={slideClasses}
              SlideTheme={SlideTheme}
              slideWidth={slideWidth}
              themePackage={themePackage}
              aspect={aspect}
            />
          </PlayerContext.Provider>
        ) : null}
      </Suspense>
    </div>
  );

};
export default Cover;

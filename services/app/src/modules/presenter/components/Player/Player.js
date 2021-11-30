import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import SwiperCore, { A11y, HashNavigation, Keyboard } from 'swiper';
import 'swiper/swiper.scss';
import uuid from "react-uuid";
import { ThemeFactory } from "../../../../common/theme/ThemeFactory";
import { ProgressTracker } from "../../../../common/util/ProgressTracker";
import { getSlideWidthFromBoundingRect } from "../../transforms/getSlideWidthFromBoundingRect";
import { makeStylesForSlides } from "../../queries/makeStylesForSlides";
import { SlidePlayerWithTheme } from "./components/SlidePlayerWithTheme";
import { PlayerContext } from "../../../composer/hooks/usePlayerId";

SwiperCore.use([A11y, Keyboard, HashNavigation]);

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    "& .swiper-container": {
      height: "100%"
    }
  }
}));

const Player = ({
  slides,
  aspect,
  themeName,
  branding,
  slidesPerView = 1,
  spaceBetween = 0,
  preview = false,
  startSlide,
  onSlideChange,
  onMouseEnter,
  onMouseLeave,
  animate = true,
  playerControls,
  setCurrent,
  setIsBeginning,
  setIsEnd,
  monitor = ProgressTracker.DUMMY,
  go = true
}) => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper) {
      if (playerControls) {
        playerControls.previous = () => swiper.slidePrev();
        playerControls.next = () => swiper.slideNext();
        playerControls.first = () => swiper.slideTo(0);
      }
      if (setIsBeginning && setIsEnd) {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      }
      if (onSlideChange) {
        swiper.on("slideChangeTransitionStart", () => {
          onSlideChange(slides[swiper.activeIndex]);
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      swiper.allowSlideNext = go;
    }
  }, [swiper, go]);

  const themePackage = ThemeFactory.instance.get(themeName, branding);

  // Prepare palette overrides for all slides to optimise JSS-in-CSS updates.
  const useSlideStyles = useMemo(() => makeStylesForSlides(slides, themeName, themePackage, { branding, animate }), [slides, themePackage]);
  const slideClasses = useSlideStyles();

  const params = {
    slidesPerView,
    height: "100%",
    autoHeight: false,
    mousewheel: true,
    keyboard: {
      enabled: !preview,
    },
    cssMode: !preview,
    spaceBetween,
    runCallbacksOnInit: true,
    on: {
      fromEdge: () => {
        if (setIsBeginning && setIsEnd) {
          setIsBeginning(false);
          setIsEnd(false);
        }
      },
      reachBeginning: () => {
        if (setIsBeginning) {
          setIsBeginning(true);
        }
      },
      reachEnd: () => {
        if (setIsEnd) {
          setIsEnd(true);
        }
      },
      activeIndexChange: (ev) => {
        if (setCurrent) {
          setCurrent(ev?.activeIndex);
        }
      }
    }
  };

  if (startSlide) {
    params.initialSlide = startSlide;
  }

  if (!preview) {
    params.hashNavigation = {
      replaceState: true,
    };
  }

  const [slideWidth, setSlideWidth] = useState(0);
  const ref = useCallback(getSlideWidthFromBoundingRect(setSlideWidth), [slideWidth]);
  const playerId = useMemo(() => `player-${uuid()}`, []);
  const classes = useStyles();

  if (!themePackage.static) {
    return (
      <div id={playerId} className={classes.root} ref={ref}>
        <PlayerContext.Provider value={playerId}>
          <SlidePlayerWithTheme
            aspect={aspect}
            branding={branding}
            themePackage={themePackage}
            slideWidth={slideWidth}
            slides={slides}
            slideClasses={slideClasses}
            monitor={monitor}
            params={params}
            setSwiper={setSwiper}
          />
        </PlayerContext.Provider>
      </div>
    );
  }

  return (
    <div id={playerId} ref={ref} className={classes.root} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      <Suspense fallback={<LinearProgress/>}>
        {slideWidth > 0 ? (
          <PlayerContext.Provider value={playerId}>
            <SlidePlayerWithTheme
              aspect={aspect}
              branding={branding}
              themePackage={themePackage}
              slideWidth={slideWidth}
              slides={slides}
              slideClasses={slideClasses}
              monitor={monitor}
              params={params}
              setSwiper={setSwiper}
            />
          </PlayerContext.Provider>
        ) : null}
      </Suspense>
    </div>
  );

};
export default Player;

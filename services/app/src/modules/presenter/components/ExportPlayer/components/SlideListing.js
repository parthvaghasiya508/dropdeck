import React, { Suspense, useCallback, useMemo, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import { ThemeFactory } from "../../../../../common/theme/ThemeFactory";
import { ProgressTracker } from "../../../../../common/util/ProgressTracker";
import { buildCombinedSlideStyles } from "../../../queries/buildCombinedSlideStyles";
import { getSlideWidthFromBoundingRect } from "../../../transforms/getSlideWidthFromBoundingRect";
import { SlidesWithTheme } from "./SlidesWithTheme";
import { makeStylesForSlides } from "../../../queries/makeStylesForSlides";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    "& .swiper-container": {
      height: "100%",
    }
  }
}));

const SlideListing = ({
  dimensions,
  slides,
  aspect,
  themeName,
  branding,
  animate = true,
  monitor = ProgressTracker.DUMMY,
}) => {

  const themePackage = ThemeFactory.instance.get(themeName, branding);

  // Prepare palette overrides for all slides to optimise JSS-in-CSS updates.
  const useSlideStyles = useMemo(() => makeStylesForSlides(slides, themeName, themePackage, { branding, animate }), [slides, themePackage]);
  const slideClasses = useSlideStyles();
  const [slideWidth, setSlideWidth] = useState(dimensions && dimensions.width ? dimensions.width : 0);
  const ref = useCallback(getSlideWidthFromBoundingRect(setSlideWidth), [slideWidth]);
  const classes = useStyles();

  // If we get a fixed width supplied, then we don't calculate dynamically.
  const widthRef = dimensions && dimensions.width > 0 ? () => {} : ref;

  if (!themePackage.static) {
    return (
      <div className={classes.root} ref={widthRef}>
        <SlidesWithTheme
          aspect={aspect}
          branding={branding}
          themePackage={themePackage}
          slideWidth={slideWidth}
          slides={slides}
          slideClasses={slideClasses}
          monitor={monitor}
        />
      </div>
    );
  }

  return (
    <div ref={widthRef} className={classes.root}>
      <Suspense fallback={<LinearProgress/>}>
        {slideWidth > 0 ? (
          <SlidesWithTheme
            dimensions={dimensions}
            aspect={aspect}
            branding={branding}
            themePackage={themePackage}
            slideWidth={slideWidth}
            slides={slides}
            slideClasses={slideClasses}
            monitor={monitor}
          />
        ) : null}
      </Suspense>
    </div>
  );

};
export default SlideListing;

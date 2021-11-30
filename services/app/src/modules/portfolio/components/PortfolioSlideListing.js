import React, { Suspense, useCallback, useMemo, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";
import Breakpoints from "../../../common/util/Breakpoints";
import { getSlideWidthFromBoundingRect } from "../../presenter/transforms/getSlideWidthFromBoundingRect";
import LightboxSlideContainer from "../../presenter/components/Lightbox/components/LightboxSlide";
import { makeStylesForSlides } from "../../presenter/queries/makeStylesForSlides";
import LightboxSlide from "../../presenter/components/Lightbox/components/LightboxSlide/LightboxSlide";
import { LIGHTBOX_THEME_JSS_INDEX } from "../../presenter/components/Lightbox/Lightbox";
import { remixStyleClassNames } from "../../presenter/queries/buildCombinedSlideStyles";

const useStyles = makeStyles((appTheme) => ({
  slide: {
    position: 'relative',
    marginBottom: '22px',
  },

  card: {
    position: 'relative',
  },
  remixName: {
    display: 'block',
    position: 'absolute',
    bottom: appTheme.spacing(-1),
    left: appTheme.spacing(2.5),
    color: '#969697',
    fontWeight: '400',
    background: 'none',
    fontSize: '12px',
    lineHeight: '16px',
    textIndent: '0',
    textAlign: 'left',
    zIndex: '1',
  },
  score: {
    display: 'block',
    position: 'absolute',
    bottom: appTheme.spacing(-1),
    right: appTheme.spacing(2.5),
    color: '#969697',
    fontWeight: '400',
    background: 'none',
    fontSize: '12px',
    lineHeight: '16px',
    textIndent: '0',
    textAlign: 'right',
    zIndex: '1',
  },
}));

const PortfolioSlideListing = ({ slides, theme, branding, slidesPerView = 1, spaceBetween = 0 }) => {

  const themePackage = ThemeFactory.instance.get(theme, branding);
  const useSlideStyles = useMemo(() => makeStylesForSlides(slides, theme, themePackage, { branding, animate: false, makeStyleOptions: { deterministic: true } }), [slides, theme]);
  const slideClasses = useSlideStyles();

  const SlideTheme = themePackage.component.wrapWithoutStyles;
  const useThemeStyles = useCallback(
    makeStyles(themePackage ? themePackage.component.css() : {}, { deterministic: false, meta: 'Portfolio', index: LIGHTBOX_THEME_JSS_INDEX }),
    [theme]
  );
  const themeClasses = useThemeStyles();

  const getScore = (slide) => {
    const { remix } = slide.settings;
    if (remix) {
      for (let i = 0; i < slide.matchingRemixes.length; i++) {
        if (slide.matchingRemixes[i].name === remix) {
          return slide.matchingRemixes[i].score;
        }
      }
    }
    return 0;
  };

  const classes = useStyles();
  const slideComponents = () => slides.map((slide, index) => (
    <Grid item key={`slide-wrapper-${index}`} className={classes.slide} {...Breakpoints.slide(3)}>
      <Card>
        <div className={classes.remixName}>
          { slide.settings.remix ? slide.settings.remix : 'No remix' }
        </div>
        <span className={classes.score}>
          Score: { getScore(slide) }
        </span>
        <LightboxSlideContainer
          readOnly
          paletteOverrideClasses={slideClasses}
          key={`slide-${index}`}
          theme={themePackage.component}
          branding={themePackage.component.branded && branding}
          slide={slide}
          className={slideClasses.slideRoot}
          remix={slide.settings.remix}
        />
      </Card>
    </Grid>
  ));

  const [slideWidth, setSlideWidth] = useState(0);
  const ref = useCallback(getSlideWidthFromBoundingRect(setSlideWidth), [slideWidth]);

  const slidePlayerWithTheme = () => (
    <DndProvider backend={HTML5Backend}>
      <div className={remixStyleClassNames(slideClasses)}>
        <SlideTheme classes={themeClasses}>
          <Grid container spacing={spaceBetween} style={{ marginBottom: 100 }}>
            {slides ? slideComponents() : null}
          </Grid>
        </SlideTheme>
      </div>
    </DndProvider>
  );

  if (!themePackage.static) {
    return (
      <div ref={ref}>
        {slidePlayerWithTheme()}
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Suspense fallback={<LinearProgress/>}>
        {slideWidth > 0 ? slidePlayerWithTheme() : null}
      </Suspense>
    </div>
  );

};
export default PortfolioSlideListing;

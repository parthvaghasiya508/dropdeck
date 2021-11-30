import React, { useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import useDimensions from "react-cool-dimensions";
import { LiveHelp } from "@material-ui/icons";
import Breakpoints from "../../../../../common/util/Breakpoints";
import { fixedAspectHeight } from "../../Slide/queries/fixedAspectHeight";
import Label from "../../../../../common/components/controls/Label";

export const TUTORIAL_SLIDE_CLASS = "tutorialSlide";

const styles = () => makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1.15), // spacing around individual slide
    height: "100%",
    opacity: 0.6,
    transform: "scale3d(1,1,1)",
    transition: "opacity 300ms ease, transform 600ms ease",
    "&:hover": {
      opacity: 1,
      transform: "scale3d(1.03,1.03,1.03)",
      transition: "opacity 300ms ease, transform 600ms ease"
    }
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  containerInner: {
    width: "75%",
    textAlign: "center",
    color: theme.palette.text.secondary,
    textShadow: theme.dark() ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.6)',
  },
  title: {
    fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif" !important',
    margin: '0 !important',
    fontWeight: '600 !important',
    lineHeight: "1.65 !important",
    color: theme.palette.text.secondary,
    textShadow: theme.dark() ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.6)',
  },
  text: {
    fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif" !important',
    margin: '0 !important',
    lineHeight: "1.5 !important",
    fontSize: "0.85em !important",
    fontWeight: '400 !important',
    letterSpacing: '0 !important',
    userSelect: "none",
    "& a": {
      color: theme.palette.secondary.main,
      fontWeight: '500',
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& span": {
      border: "1px solid rgba(0,0,0,0.03)",
      background: "rgba(0,0,0,0.03)",
      margin: "0 1px -3px 1px",
      padding: "0px 4px 1px 4px",
      fontSize: "0.85em",
      borderRadius: "2px",
      fontWeight: '600',
    },
  },
}));

const link = "/docs/play/tutorial";
const icon = <LiveHelp style={{ marginBottom: 4 }}/>;

export const tutorialHelperSuggestion = () => ({
  icon,
  link,
  name: 'Tutorial',
  keywords: 'tutorial,help',
});

const TutorialHelper = ({ show, cols }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles(cols);
  const { ref: resizeRef, width } = useDimensions();

  return (
    <Grid item className={`${classes.root} ${TUTORIAL_SLIDE_CLASS}`} {...Breakpoints.slide(cols)} style={{ visibility: show ? "visible" : "hidden" }}>
      <div ref={resizeRef} className={classes.container} style={{ height: fixedAspectHeight(width) }}>
        <div className={classes.containerInner}>
          { icon }
          <Label className={classes.title} variant="h5">New to Dropdeck?</Label>
          <p className={classes.text}>Check out the&nbsp;<a href={link} target="_blank" rel="noreferrer" style={{ marginRight: 1 }}>tutorial</a>!</p>
        </div>
      </div>
    </Grid>
  );
};
export default TutorialHelper;

import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import Colors from "../../../../../../../../Colors";
import { Moods } from "../../../../../../../../theme/Palette";

const styles = () => makeStyles((theme) => ({
  root: {
    float: "left",
    padding: 0,
    margin: 1,
    border: `6px solid transparent`,
    "&.selected button, &.original button": {
      boxShadow: theme.dark() ? "rgba(0,0,0,0.45) 1px 1px 2px, rgba(0,0,0,0.25) -1px -1px 2px" : null,
    },
    "&.selected, &.original": {
      boxShadow: theme.dark() ? null : "rgba(0,0,0,0.2) 0px 1px 1px",
      border: theme.dark() ? `6px solid ${theme.palette.text.primary}20` : `6px solid ${theme.palette.background.border04}`,
      borderRadius: "50%",
    },
    "&.selected": {
      boxShadow: theme.dark() ? null : "rgba(0,0,0,0.2) 0px 1px 1px",
      border: theme.dark() ? `6px solid ${theme.palette.text.primary}55` : `6px solid #ffffff`,
    },
    "& .mood": {
      position: "absolute",
      bottom: -20,
      borderRadius: 12,
      transform: "scale(0.2)",
      transition: "transform 100ms ease-out, bottom 25ms ease-out, border 25ms ease-out",
      transitionDelay: '0s',
      border: "1px solid rgba(0,0,0,0)",
      "&.positive": {
        backgroundColor: "#66ff00",
        color: "#66ff00",
      },
      "&.negative": {
        backgroundColor: "#ff3838",
        color: "#ff3838"
      },
    },
    "&:hover .mood": {
      "&.positive": {
        color: "#2d7000",
        border: "1px solid #2d7000"
      },
      "&.negative": {
        color: "#fff2f2",
        border: "1px solid #fff2f2"
      },
      bottom: -12,
      padding: 3,
      height: 8,
      width: 8,
      transition: "transform 100ms ease-out, bottom 25ms ease-out, border 25ms ease-out",
      transitionDelay: '0s',
      transform: "scale(1)",
    }
  },
}));
const PaletteInkwell = ({ palette, pickPalette, original, selected }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={`${classes.root}${original ? " original" : ""}${selected ? " selected" : ""}`}>
      <IconButton onClick={() => pickPalette(palette)} className="paletteIcon" style={{
        backgroundColor: palette.background(),
        color: palette.title(),
        borderColor: palette.accent(),
      }}>
        <div>
          A<span style={{ color: palette.text() }}>a</span>
        </div>
        {!selected && !original && palette.mood() === Moods.Positive && (<ThumbUp className="mood positive"/>)}
        {!selected && !original && palette.mood() === Moods.Negative && (<ThumbDown className="mood negative"/>)}
      </IconButton>
    </div>
  );
};
export default PaletteInkwell;

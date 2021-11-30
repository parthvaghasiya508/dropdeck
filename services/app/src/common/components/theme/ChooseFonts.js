import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import capitalize from "@material-ui/core/utils/capitalize";
import FontPicker from "../fonts/FontPicker";
import Label from "../controls/Label";
import { createLinkElements } from "../../util/FontUtility";

const styles = () => makeStyles((theme) => ({
  root: {
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: "1.2em",
    textAlign: "center",
    "& .title": {
      fontSize: "1.75em",
      fontWeight: 500,
      padding: '6px 20px 20px 20px',
    },
    "& .bodytext": {
      fontSize: "0.9em",
      fontWeight: 400,
      padding: '6px 20px 20px 20px',
    },
    "& .label": {
      color: theme.palette.text.primary,
      fontSize: "0.8em"
    }
  },
  typePreview: {
    margin: '1rem 0 2rem 0',
    border: "1px solid",
    borderColor: theme.dark() ? theme.palette.background.elev01 : theme.palette.background.elev02,
    background: theme.dark() ? theme.palette.background.elev03 : theme.palette.background.elev00,
    borderRadius: 7,
  },
  textLabel: {
    margin: '20px auto 0 auto',
    fontWeight: '500',
    fontSize: '0.8rem',
    width: 'min-content',
    borderRadius: 3,
    padding: '3px 12px',
    background: theme.dark() ? theme.palette.label.light : theme.palette.background.elev04,
  },
}));

const ChooseFonts = ({ defaultFonts, fonts, onSelectTitle, onSelectText, setTitleFontFound = () => {}, setTextFontFound = () => {} }) => {

  const GetFonts = () => {
    if (fonts) {
      return createLinkElements(fonts);
    }
    return null;
  };

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GetFonts/>

      <div className={classes.container}>
        <div className={classes.typePreview}>
          <Label className={classes.textLabel}>Title</Label>
          <Label className="title" style={{ fontFamily: fonts && fonts.title && fonts.title.name ? fonts.title.name : "inherit" }}>Think it. Type it. See it.</Label>
          <div className="label">
            <FontPicker defaultFont={defaultFonts && defaultFonts.title} font={fonts && fonts.title} onSelect={onSelectTitle} setFontFound={setTitleFontFound}/>
          </div>
        </div>
        <div className={classes.typePreview}>
          <Label className={classes.textLabel}>Text</Label>
          <Label className="bodytext" style={{ fontFamily: fonts && fonts.text && fonts.text.name ? fonts.text.name : "inherit" }}>Building beautiful presentations should be easy.</Label>
          <div className="label">
            <FontPicker defaultFont={defaultFonts && defaultFonts.text} font={fonts && fonts.text} onSelect={onSelectText} setFontFound={setTextFontFound}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChooseFonts;

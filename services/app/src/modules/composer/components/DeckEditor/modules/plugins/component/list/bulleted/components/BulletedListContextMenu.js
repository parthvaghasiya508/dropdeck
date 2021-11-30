import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Section from "../../../../../../../../../../common/components/popup/Section";
import Label from "../../../../../../../../../../common/components/controls/Label";

const BulletStyle = {
  tick: "tick",
  plus: "plus",
  arrow: "arrow",
  cross: "cross",
  bullet: "bullet",
};

const listMenuStyles = () => makeStyles((theme) => ({
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.popover.label,
    fontSize: 13,
  },
  icon: {
    width: 10,
    height: 10,
    padding: 5,
    textAlign: "center",
    backgroundColor: theme.dark() ? theme.palette.background.border03 : theme.palette.background.elev03,
    borderRadius: "50%",
    marginRight: 8,
  }
}), { meta: 'DeckControlPanel' });

const displayKey = 'display';

export const BulletedListContextMenu = ({ editor, path }) => {

  const settingsEditor = editor.settings(path);
  const [displayValue, setDisplayValue] = useState(settingsEditor.get(displayKey) || BulletStyle.bullet);
  const onChange = (event) => {
    setDisplayValue(event.target.value);
    settingsEditor.set(displayKey, event.target.value);
  };

  const useStyles = useCallback(listMenuStyles(), []);
  const classes = useStyles();
  const radioStyles = { padding: 4, marginLeft: 8, marginRight: 7 };
  return (
    <Section title="List Style">
      <RadioGroup aria-label="display" name="display" value={displayValue} onChange={onChange}>
        {/* Bullet */}
        <FormControlLabel value={BulletStyle.bullet} control={<Radio style={radioStyles} />} className={classes.label} label={(
          <Label className={classes.label}>
            <svg className={classes.icon} width="10px" height="10px" viewBox="0 0 77 77"><path d="M48 38 C48 32.477 43.523 28 38 28 32.477 28 28 32.477 28 38 28 43.523 32.477 48 38 48 43.523 48 48 43.523 48 38 Z" fill="currentColor" fillOpacity="1" stroke="none"/></svg>
            Bullet
          </Label>
        )}/>
        {/* Tick */}
        <FormControlLabel value={BulletStyle.tick} control={<Radio style={radioStyles} />} className={classes.label} label={(
          <Label className={classes.label}>
            <svg className={classes.icon} width="10px" height="10px" viewBox="0 0 77 77"><path d="M27.393 64.477 L75.477 16.393 70.527 11.444 27.393 54.577 5.473 32.657 0.523 37.607 Z" fill="currentColor" fillOpacity="1" stroke="none"/></svg>
            Tick
          </Label>
        )}/>
        {/* Cross */}
        <FormControlLabel value={BulletStyle.cross} control={<Radio style={radioStyles} />} className={classes.label} label={(
          <Label className={classes.label}>
            <svg className={classes.icon} width="10px" height="10px" viewBox="0 0 77 77"><path d="M16.58 65.37 L38.491 43.458 60.42 65.37 65.37 60.42 43.383 38.567 65.37 16.58 60.42 11.63 38.456 33.594 16.58 11.63 11.63 16.58 33.48 38.57 11.63 60.42 Z" fill="currentColor" fillOpacity="1" stroke="none"/></svg>
            Cross
          </Label>
        )}/>
        {/* Arrow */}
        <FormControlLabel value={BulletStyle.arrow} control={<Radio style={radioStyles} />} className={classes.label} label={(
          <Label className={classes.label}>
            <svg className={classes.icon} width="10px" height="10px" viewBox="0 0 77 77"><path d="M72.87 38 L46 64.87 41.05 59.92 58.965 42.006 4 42 4 35 58 35 59.99 35.02 41.05 16.08 46 11.13 Z" fill="currentColor" fillOpacity="1" stroke="none"/></svg>
            Arrow
          </Label>
        )}/>
        {/* Plus */}
        <FormControlLabel value={BulletStyle.plus} control={<Radio style={radioStyles} />} className={classes.label} label={(
          <Label className={classes.label}>
            <svg className={classes.icon} width="10px" height="10px" viewBox="0 0 77 77"><path d="M42 73 L42 42.012 73 42 73 35 42 35.095 42 4 35 4 35 35.062 4 35 4 42 35 42.099 35 73 Z" fill="currentColor" fillOpacity="1" stroke="none"/></svg>
            Plus
          </Label>
        )}/>
      
      </RadioGroup>
    </Section>
  );
};

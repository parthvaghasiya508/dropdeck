import React, { useCallback } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { NightsStay, WbSunny } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { usePreference } from "../../api/sdk/hooks/PreferenceHooks";
import Label from "../controls/Label";

const styles = () => makeStyles((theme) => ({
  root: {},
  label: {
    color: theme.dark() ? theme.palette.text.primary : "#fff",
    "& span p": {
      fontSize: "0.85rem"
    }
  },
  thumb: {
    backgroundColor: "#fff"
  },
  disabled: {
    "& .MuiSwitch-thumb": {
      backgroundColor: "#aaa"
    }
  },
  track: {
    backgroundColor: "#ff9800",
  }
}));

const LightingModePreference = () => {

  const LIGHTING_DEFAULT_STATE = "default";
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [lightingMode, setLightingMode] = usePreference("lighting-mode", LIGHTING_DEFAULT_STATE);

  const modeChange = (event) => {
    const { value, checked } = event.target;
    if (value === LIGHTING_DEFAULT_STATE) {
      // Toggled default switch

      if (lightingMode === LIGHTING_DEFAULT_STATE) {
        // Turning off default
        setLightingMode(prefersDarkMode ? "light" : "dark");
      } else {
        // Turning on default
        setLightingMode(LIGHTING_DEFAULT_STATE);
      }
    } else if (checked) {
      setLightingMode("dark");
    } else if (!checked) {
      setLightingMode("light");
    }
  };

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div>
      <FormControlLabel
        className={classes.label}
        control={(
          <Checkbox
            checked={lightingMode === LIGHTING_DEFAULT_STATE}
            onChange={modeChange}
            value={LIGHTING_DEFAULT_STATE}
            color="primary"
          />
        )}
        label={<Label>Default</Label>}
      />
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <WbSunny style={{
          color: "#ff9800",
          opacity: lightingMode === LIGHTING_DEFAULT_STATE ? 1 : 0.8
        }}/>
        <Switch onChange={modeChange} classes={{ track: classes.track, thumb: classes.thumb, disabled: classes.disabled }} checked={lightingMode === "dark" || lightingMode === LIGHTING_DEFAULT_STATE && prefersDarkMode} value="dark" disabled={lightingMode === LIGHTING_DEFAULT_STATE}/>
        <NightsStay style={{
          color: "#ADD8E6",
          opacity: lightingMode === LIGHTING_DEFAULT_STATE ? 1 : 0.8
        }}/>
      </div>
    </div>
  );
};
export default LightingModePreference;

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const styles = (color, checked) => makeStyles(() => ({
  root: {
    color: "#ccc",
    '& label span:last-of-type': {
      fontSize: '0.75rem',
    },
    '& .MuiSwitch-track': {
      background: checked ? color || "#57FF00" : '#7a7a7c',
    },
    '& .MuiSwitch-switchBase': {
      color: '#f4f7fb',
    },
    '& .Mui-disabled': {
      color: "#777"
    }
  },
  switch: {
    margin: 0,
    padding: 0,
  }
}), { meta: 'ToggleButton' });

/**
 * Toggle switch.
 *
 * @returns {*}
 * @constructor
 */
const ToggleButton = ({ label, checked, onChange, value, style, disabled, color, size = "small" }) => {

  const useStyles = useCallback(styles(color, checked), [color, checked]);
  const classes = useStyles();

  return (
    <div className={classes.root} style={style}>
      <FormControlLabel
        control={(
          <Switch
            checked={checked}

            onChange={(event) => onChange(event.target.checked)}
            value={value}
            color="default"
            disabled={disabled}
            size={size}

          />
        )}
        className={classes.switch}
        label={label}
      />
    </div>
  );
};
export default ToggleButton;

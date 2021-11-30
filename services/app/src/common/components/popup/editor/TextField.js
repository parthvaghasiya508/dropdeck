import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@material-ui/core";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";

const styles = () => makeStyles((theme) => ({
  root: {
    margin: "2px 0 2px 0"
  },
  label: {
    color: `${theme.dark() ? "#7a7a7c" : "#9ca3af"}`,
    "&.Mui-focused": {
      color: `${theme.dark() ? "#ffffff" : "#9ca3af"}`,
    }
  },
  input: {
    color: `${theme.dark() ? "#ffffff" : "#262628"}`,
  },
  underline: {
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: `${theme.dark() ? "1px solid #7a7a7c" : "1px solid rgba(0,0,0,0.1)"}`,
    },
    "&:after": {
      borderBottom: `${theme.dark() ? "1px solid rgba(255,255,255,0.85)" : "1px solid rgba(0,0,0,0.25)"}`,
    }
  }
}));
const PopupTextField = ({ name, label, value, onChange, placeholder, helperText, autoFocus }) => {

  const _name = name || label.toLowerCase().replaceAll(" ", "-");
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <FormControl className={classes.root} fullWidth>
      <InputLabel className={classes.label} htmlFor={_name}>{label}</InputLabel>
      <Input
        id={_name}
        classes={{ input: classes.input, underline: classes.underline }}
        value={value}
        onChange={onChange}
        aria-describedby={`helper-text-${_name}`}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      <FormHelperText id={`helper-text-${_name}`}>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default PopupTextField;

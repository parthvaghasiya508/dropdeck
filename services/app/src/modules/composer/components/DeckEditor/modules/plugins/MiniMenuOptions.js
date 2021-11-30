import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const styles = () => makeStyles((theme) => ({
  root: {
    zIndex: 1,
    "& :not(:last-child)": {
      // borderRight: "0",
    },

    "& button": {
      border: `1px solid ${theme.palette.background.border01} !important`,
      backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
      boxShadow: 'none !important',
      height: 30,
      width: 40,
      "&:hover": {
        backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop01} 0%, ${theme.palette.gradient.stop02} 50%)`,
        "& *": {
          color: theme.palette.text.primary,
        },
      },
    },
    "& svg": {
      fontSize: "1.125em"
    },
    "& button.primaryBlockIcon:nth-of-type(2) svg": {
      transform: "scale(0.84)",
      paddingTop: 1,
    },
  }

}));

const FlyoutOptions = ({ children }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <ToggleButtonGroup value={{}} onMouseDown={(event) => event.preventDefault()} onChange={() => {}} aria-label="formatting" size="small" className={classes.root}>
      {children}
    </ToggleButtonGroup>
  );
};
export default FlyoutOptions;

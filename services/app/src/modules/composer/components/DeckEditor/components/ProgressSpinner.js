import { makeStyles , useTheme } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useCallback } from "react";

const styles = () => makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  top: {
    color: theme.dark() ? '#4a4a4c' : '#eef3fd',
  },
  bottom: {
    color: '#f31139',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
}), { meta: 'ProgressSpinner' });

export const ProgressSpinner = (props) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root} style={theme}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={24}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
};

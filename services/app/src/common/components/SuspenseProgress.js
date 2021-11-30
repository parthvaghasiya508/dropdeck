import React, { useCallback } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from '@material-ui/styles';

const styles = () => makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: theme.palette.background.default
  }
}));

/**
 * Generic progress component to use at the top of the application.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SuspenseProgress = () => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (<LinearProgress color="primary" classes={{ root: classes.colorPrimary }}/>);
};
export default SuspenseProgress;

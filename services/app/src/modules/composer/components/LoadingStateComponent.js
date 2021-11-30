import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import MessageFactory from '../../../common/util/MessageFactory';
import Label from "../../../common/components/controls/Label";

const styles = () => makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: theme.dark() ? theme.palette.background.default : "#fff"
  },
  outer: {

  },
  main: {
    // Fix anything but phone size because iPhone softkeyboard is a moron
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      position: 'fixed',
    },
    marginTop: 48,
  },
  container: {
    textAlign: 'center',
    margin: 'auto',
    padding: "5%",
    color: theme.palette.text.secondary
  },
  button: {
    marginTop: theme.spacing(4),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}), { meta: 'LoadingState' });

/**
 *
 * @param status
 * @param progress
 * @param message
 * @param player
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingStateComponent = ({ status, progress, message }) => {

  const [preCanned, setPreCanned] = useState();

  useEffect(() => {
    setPreCanned(MessageFactory.getText(status));
  }, [status]);

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.root} >
      <div className={classes.outer} style={{ fontSize: '3em', margin: 'auto', paddingBottom: 140 }}>
        <div className={classes.container}>
          <div>
            <div style={{ display: progress !== undefined ? "block" : "none", marginBottom: 20 }}>
              <CircularProgress variant="determinate" value={progress} size={75} />
            </div>
            <Label variant="h1">{message !== undefined ? message : preCanned}</Label>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default LoadingStateComponent;

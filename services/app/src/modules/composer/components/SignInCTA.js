import { useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FaceIcon from '@material-ui/icons/Face';
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../../../common/components/popup/Popup/Popup";

const styles = () => makeStyles((theme) => ({
  root: {
    position: 'relative',
    textAlign: "center",
    bottom: 126,
    zIndex: 10,
    width: 160,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      left: 'calc(50% - 80px)',
      bottom: 40,
    },
  },
  button: {
    backgroundColor: theme.dark() ? theme.palette.background.main : "#fff",
    width: 'auto',
    height: 48,
    padding: '0 16px',
    borderRadius: 24,
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.1),0px 1px 18px 0px rgba(0,0,0,0.05)",
    "&:hover": {
      backgroundColor: theme.dark() ? theme.palette.background.main : "#fff",
    }
  },
  popup: {
    opacity: 0.75,
    textAlign: "center",
    padding: 15,
    margin: 5,
    zIndex: 10,
    backgroundColor: theme.dark() ? theme.palette.background.main : "#fff",
    "& h5": {
      fontSize: "1.35em",
      fontWeight: 800,
      lineHeight: 1.2,
    },
    "& p, & a": {
      color: theme.palette.text.primary,
      fontSize: "0.8em",
      "& a": {
        color: theme.palette.secondary.main,
        fontSize: "unset",
        fontWeight: "bold"
      }
    }
  }
}));

const SignInCTA = () => {

  const history = useHistory();

  const theme = useTheme();
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  const ref = useRef();

  const [autoOpen, setAutoOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(anchorEl && !autoOpen ? null : event.currentTarget);
    setAutoOpen(false);
  };

  const callToAction = () => {
    history.push("/start");
  };

  useEffect(() => {
    setTimeout(() => {
      setAnchorEl(ref.current);
      setAutoOpen(true);
    }, 1000 * 60 * 2);
  }, []);

  return (
    <div className={classes.root}>
      <Button className={classes.button} ref={ref} onClick={callToAction} onMouseEnter={handleClick} onMouseLeave={handleClick} color="secondary" variant="outlined" size="large">
        <FaceIcon style={{ marginRight: 16, fontSize: 28 }}/>
        Sign in
      </Button>
      <Popup anchor={anchorEl} setAnchor={setAnchorEl} open={open} width={240} color={theme.dark() ? theme.palette.background.main : "rgba(255,255,255,1)"}>
        <div className={classes.popup}>
          <Typography variant="h5" color="secondary">Need reasons<br/>to sign up?</Typography>
          <p><strong>Creating an account is<br/>completely free!</strong></p>
          <p>It gives you instant access to all your slide decks, lets you keep them private, along with a host of other features!</p>
          <p>Don't worry, all your work to date will be automatically transferred to the new account.</p>
        </div>
      </Popup>
    </div>
  );
};
export default SignInCTA;

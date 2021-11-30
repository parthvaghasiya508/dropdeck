import { Button } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import AppThemeUtils from "../../AppThemeUtils";
import Label from "../../common/components/controls/Label";
import LogoDark from "../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../common/components/dropdeck-logo-preview.png";
import Footer from "../../common/components/Footer";
import MessageFactory, { StatusMessage } from "../../common/util/MessageFactory";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    alignItems: 'center',
    ...AppThemeUtils(theme).background.base.normal,
    fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
    fontWeight: '500',
    color: '#9a9c9e',
  },
  container: {
    width: '352px',
    borderRadius: 7,
    boxSizing: 'border-box',
    ...AppThemeUtils(theme).shadows.topCenter,
    ...AppThemeUtils(theme).background.top.normal,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    padding: 40,
    paddingBottom: 30,
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '& h1': {
      marginBottom: '0.65em',
    },
    '& h2': {
      margin: '0 0 0.5em 0',
      fontWeight: '500',
    },
  },
  logo: {
    display: "block",
    backgroundImage: `url(${theme.palette.type === "dark" ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 230,
    height: 30,
    width: 230,
    marginTop: 40,
    marginBottom: 40
  }
}));

const ErrorPage = () => {

  const classes = useStyles();
  const [timer, setTimer] = useState(25);
  const [message] = useState(MessageFactory.getText(StatusMessage.Error));

  setTimeout(() => {
    setTimer(timer - 1);
  }, 1000);

  if (timer === 0) {
    window.location = "/";
  }

  return (

    <div className={classes.root}>

      <div className={classes.container}>
        <div className={classes.logo} />
        <Label variant="h1">{message} <span role="img" aria-label="ill emoji">🤕</span></Label>
        <Label variant="h3">There’s a problem with our service right now.</Label>
        <Label variant="p" style={{ margin: 10, marginBottom: 0 }}>The Dropdeck team have been notified, but feel free to contact us directly via the support button below:</Label>
        <Button startIcon={<HelpIcon fontSize="large"/>} variant="contained" color="primary" href="https://dropdeck.freshdesk.com/" target="_new" size="large" style={{ margin: 26 }}>
          Support
        </Button>
        <Label variant="p"> Retrying automatically in <strong style={{ color: "#f20f38" }}>{timer}...</strong></Label>
      </div>
      <Footer/>
    </div>
  );
};
export default ErrorPage;

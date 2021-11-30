import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import HelpIcon from "@material-ui/icons/HelpOutline";
import { Button } from "@material-ui/core";
import AppThemeUtils from "../../AppThemeUtils";
import Label from "../../common/components/controls/Label";
import LogoDark from "../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../common/components/dropdeck-logo-preview.png";
import Footer from "../../common/components/Footer";
import MessageFactory, { StatusMessage } from "../../common/util/MessageFactory";
import { ROUTE_HOME } from "../../Routes";

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

const NotFound = ({ type = "deck" }) => {

  const classes = useStyles();
  const [message] = useState(MessageFactory.getText(StatusMessage.NotFound));
  return (
    <div className={classes.root}>

      <div className={classes.container}>
        <div className={classes.logo} />
        <Label variant="h1">{message} <span role="img" aria-label="thinking emoji">🤔</span></Label>
        <Label variant="h3">We couldn't find the {type} you asked for.</Label>
        <Label variant="p" style={{ margin: 10, marginBottom: 0 }}>When this happens, it could be because the owner only shared the {type} with a small group of people or changed who can see it, or it's been deleted.</Label>
        <Button variant="contained" color="primary" href={ROUTE_HOME} size="large" style={{ margin: 26 }}>
          Home
        </Button>
      </div>
      <Footer/>
    </div>
  );
};
export default NotFound;

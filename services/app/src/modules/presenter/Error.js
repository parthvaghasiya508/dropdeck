import React from "react";
import { makeStyles } from '@material-ui/styles';
import HelpIcon from "@material-ui/icons/HelpOutline";
import { Button } from "@material-ui/core";
import Footer from "../../common/components/Footer";
import AppThemeUtils from "../../AppThemeUtils";
import LogoDark from "../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../common/components/dropdeck-logo-preview.png";
import Label from "../../common/components/controls/Label";

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

const Error = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <a aria-label="login" href="/"><div className={classes.logo}/></a>
        <Label variant="h1">Something is not right! <span role="img" aria-label="thinking emoji">🤔</span></Label>
        <Label variant="h3">It looks like this deck <strong>may have been deleted</strong>, or is <strong>not shared with you</strong>.</Label>
        <Label variant="p" style={{ marginTop: 18 }}>If you do not believe this is correct, drop us a line via the support button below:</Label>
        <Button startIcon={<HelpIcon fontSize="large"/>} variant="contained" color="primary" href="https://dropdeck.freshdesk.com/" target="_new" size="large" style={{ margin: 26 }}>
          Support
        </Button>
      </div>
      <Footer/>
    </div>
  );
};
export default Error;

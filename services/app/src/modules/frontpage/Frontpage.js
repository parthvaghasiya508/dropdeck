import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Typography, useMediaQuery } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Alert from "@material-ui/lab/Alert";
import { apiHost } from "../../App";
import AppThemeUtils from "../../AppThemeUtils";
import LogoDark from "../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../common/components/dropdeck-logo-preview.png";
import GoogleSignInLogo from "./images/goog-symbol.png";
import MSFTSignInLogo from "./images/msft-symbol.png";
import LandingPortrait from "./images/landing-portrait.png";
import LandingLandscape from "./images/landing-landscape.png";
import LandingWallpaper from "./images/landing-wallpaper.jpg";
import { config } from "../../config";
import { useQuery } from "../../common/util/useQuery";
import { LoginForm } from "./components/LoginForm";
import { feature } from "../../common/config/feature";
import Label from "../../common/components/controls/Label";

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
    fontWeight: '500',
    color: '#9a9c9e',
    ...AppThemeUtils(theme).background.base.normal,
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.dark() ? "#000" : "#fff",
    },
  },
  backgroundPanel: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      background: 'linear-gradient(-42deg, rgb(254 99 76) 20%, rgb(240 87 124) 47%, rgb(251 104 96) 55%, rgb(254 202 57) 67%, rgb(255 143 71) 100%)',
    },
    boxShadow: `${theme.palette.type === "dark" ? "inset -23px 0px 5px -21px rgb(80 0 0 / 0.5)" : "inset -12px 0 6px -12px rgb(80 0 0 / 0.2)"}`,
    backgroundSize: 'cover !important',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${LandingWallpaper})`,
      backgroundSize: 'cover !important',
      boxShadow: `${theme.palette.type === "dark" ? "inset -23px 0px 5px -21px rgb(80 0 0 / 0.5)" : "inset -12px 0 6px -12px rgb(80 0 0 / 0.2)"}`,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  foregroundLarge: {
    '& img': {
      width: '88%',
      position: 'relative',
      zIndex: '2',
    },
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  foregroundSmall: {
    '& img': {
      width: '75%',
      position: 'relative',
      zIndex: '2',
    },
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },

  // Form:
  formPanel: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderLeft: `1px solid ${theme.palette.type === "dark" ? "rgb(0 0 0 / 0.075)" : "rgb(0 0 0 / 0)"}`,
  },
  container: {
    borderRadius: 7,
    ...AppThemeUtils(theme).shadows.topCenter,
    ...AppThemeUtils(theme).background.top.normal,
    display: 'flex',
    alignItems: 'center',
    padding: 50,
    paddingBottom: 40,
    paddingTop: 40,
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.dark() ? "#000" : "#fff",
      boxShadow: 'none',
    },
  },
  button: {
    color: "#fff",
    width: '100%',
    marginBottom: 16,
    textTransform: 'none',
    fontWeight: 600,
    letterSpacing: "0.9",
    "&.goog": {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: "bold",
      color: "#767676",
      backgroundColor: "#fff",
      "&:hover": {
        transform: "scale(1.01)",
        transition: "transform 300ms ease",
      }
    },
    "&.msft": {
      fontFamily: "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif",
      color: theme.dark() ? "#fff" : "#5e5e5e",
      fontSize: 15,
      backgroundColor: theme.dark() ? "#2e2e2e" : "#fff",
      "&:hover": {
        transform: "scale(1.02)",
        transition: "transform 300ms ease",
        backgroundColor: theme.dark() ? "#282828" : "#fff",
      },
    },
    [theme.breakpoints.down('xs')]: {
      border: theme.dark() ? null : "1px solid #9ca3af45",
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
  },
  helper: {
    padding: '12px 0 18px 0',
    textAlign: "center",
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
  },
}));

const FrontPage = ({ message, location }) => {

  const query = useQuery();
  const redirectUri = query.get("redirect");
  const redirectParameter = redirectUri ? `?redirect=${redirectUri}` : '';

  const classes = useStyles();
  const materialTheme = useTheme();
  const isPhoneSize = useMediaQuery(materialTheme.breakpoints.up('sm'));
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {/* BG Image */}
        {isPhoneSize ? (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={8}>
            <div className={classes.backgroundPanel}>
              <div className={classes.foregroundLarge}>
                <img src={LandingLandscape} alt="" />
              </div>
              <div className={classes.foregroundSmall}>
                <img src={LandingPortrait} alt="" />
              </div>
            </div>
          </Grid>
        ) : null}

        {/* Form */}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
          <div className={classes.formPanel}>
            <div style={{ alignSelf: "flex-start" }} />
            <div className={classes.logo} />
            <div className={classes.container}>
              <Label variant="h4">Sign in or create your account</Label>
              <Label style={{ marginTop: 20, marginBottom: 8, width: 280, fontSize: "0.8em", textAlign: "center" }}>If you do not already have a Dropdeck account you will get the option of creating one.</Label>
              <br/>
              { message ? <Alert style={{ marginBottom: '15px' }} severity={message.severity || "error"}>{message.value}</Alert> : null }
              <Button className={`${classes.button} goog`} variant="contained" size="large" href={`${apiHost()}${config.app.paths.auth}/google${redirectParameter}`}>
                <img src={GoogleSignInLogo} height={21} style={{ marginRight: 23 }} alt="google sign in"/>
                <span style={{ marginRight: 12 }}>Sign in with Google</span>
              </Button>
              <Button className={`${classes.button} msft`} variant="contained" size="large" href={`${apiHost()}${config.app.paths.auth}/office-365${redirectParameter}`}>
                <img src={MSFTSignInLogo} style={{ marginRight: 12 }} alt="microsoft sign in"/>
                <span style={{ marginLeft: 8 }}>Sign in with Microsoft</span>
              </Button>

              { feature.auth.local && <LoginForm className={classes.helper} /> }

            </div>
            <div style={{ alignSelf: "flex-end" }} />
          </div>
        </Grid>

      </Grid>
    </div>

  );
};
export default FrontPage;

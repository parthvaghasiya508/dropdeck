import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import LogoDark from "../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../common/components/dropdeck-logo-preview.png";
import AppThemeUtils from "../../AppThemeUtils";

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
    '& .MuiTypography-root': {
      fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
      letterSpacing: '-0.018em',
      color: '#9a9c9e',
      '&.MuiTypography-h1': {
        fontWeight: '700',
        paddingTop: 20,
        paddingBottom: 10,
      },
    },
  },
  paper: {
    borderRadius: 7,
    width: 500,
    ...AppThemeUtils(theme).shadows.topCenter,
    ...AppThemeUtils(theme).background.top.normal,
    display: 'flex',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 40,
    paddingTop: 30,
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    textAlign: "center",
  },
  logo: {
    display: "block",
    backgroundImage: `url(${theme.palette.type === "dark" ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 230,
    height: 30,
    width: 230,
    marginTop: 40,
    marginBottom: 60
  }
}));

const AccountPending = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <div className={classes.logo} />
        <Typography component="h1" variant="h1">
          You’re in the queue!
        </Typography>
        <Typography component="h3" variant="h3" style={{ padding: 20 }}>
          Thank you so much for your interest in Dropdeck. We’re excited to have you.<br/><br/>
          During our limited preview phase we’re verifying accounts before granting access, but we will be in touch very shortly.
        </Typography>
        ___<br/><br/>
        The Dropdeck Team.<br/>
      </div>
    </div>
  );
};
export default AccountPending;

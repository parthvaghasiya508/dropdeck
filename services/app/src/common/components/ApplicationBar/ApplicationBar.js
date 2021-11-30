import { Button } from "@material-ui/core";
import React, { useCallback } from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import AppBar from '@material-ui/core/AppBar/AppBar';
import { makeStyles } from '@material-ui/styles';
import LogoLight from 'common/components/dropdeck-logo-preview.png';
import LogoDark from 'common/components/dropdeck-logo-preview-dark.png';
import { Link } from "react-router-dom";
import ProfileMenu from "../user/ProfileMenu";
import { config } from "../../../config";

const styles = () => makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.elev00,
    padding: theme.spacing(0,0,0,3),
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.dark() && "#000",
      padding: theme.spacing(0,0,0,0),
    },
    color: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 6px 13px -8px, rgba(0, 0, 0, 0.1) 0px 4px 8px -8px, rgba(0, 0, 0, 0.01) 0px -3px 8px -6px',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: "block",
    backgroundImage: `url(${theme.palette.type === "dark" ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 131,
    height: 17,
    width: 131,
    marginBottom: -3,
    marginLeft: 14,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 8,
    },
    textDecoration: 'none',
    opacity: theme.dark() ? 0.8 : 1,
    transform: "scale(1)",
    transition: 'all ease-in-out 0.15s',
    "&:hover": {
      opacity: 1,
      transform: "scale(1.05)",
    },
  },
  profileMenu: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: -10,
    },
  }
}), { meta: 'ApplicationBar' });

const ApplicationBar = ({ user, children, contextMenu = true }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        {/* Logo */}
        <a href={config.app.paths.home} className={classes.logo}> </a>

        {children || <div> </div>}

        {contextMenu ? (
          <>
            <div style={{ marginRight: 12 }}><Button component={Link} variant="text" to="/configure" style={{ fontSize: "0.72em", fontWeight: 500, paddingLeft: 12, paddingRight: 12 }}>Configure</Button></div>
            <div className={classes.profileMenu}>
              <ProfileMenu user={user}/>
            </div>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
export default ApplicationBar;

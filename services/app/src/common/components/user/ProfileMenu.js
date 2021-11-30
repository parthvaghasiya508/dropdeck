import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, IconButton } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ExitToApp, HelpOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Popup from "../popup/Popup/Popup";
import { apiHost } from "../../../App";
import Section from "../popup/Section";
import LightingModePreference from "./LightingModePreference";

const styles = () => makeStyles((theme) => ({
  root: {
    transition: "all 300ms ease",
    color: theme.palette.icon.primary,
    "&:hover": {
      transform: "scale(1.1)",
      color: theme.palette.icon.primaryHover,
      background: theme.palette.icon.primaryHoverBg,
    },
  },
  // Logout
  button: {
    padding: 4,
    margin: 2,
    width: "100%",
    justifyContent: 'flex-start',
  },
  // Support
  color: {
    color: theme.palette.text.primary,
  },
  //
  label: {
    color: theme.dark() ? theme.palette.text.primary : "#fff",
    "& span": {
      fontSize: "0.9em",
    }
  },
}));

const ProfileMenu = ({ user }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const logout = () => {
    window.location = `${apiHost()}/auth/logout`;
  };

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  return (
    <>
      <IconButton className={classes.root} onClick={handleClick} style={{ padding: 6, marginRight: 14 }}>
        {user?.picture ? (
          <img src={user.picture} width="30" height="30" alt="profile" style={{ borderRadius: "50%" }} />
        ) : (
          <AccountCircleIcon style={{ height: 30, width: 30 }}/>
        )}
      </IconButton>
      <Popup anchor={anchorEl} setAnchor={setAnchorEl} width={180} defaultPlacement="bottom" open={open}>
        <Section title="Lighting">
          <LightingModePreference/>
        </Section>
        <Section>
          <Button startIcon={<HelpOutline/>} variant="text" className={`${classes.button} ${classes.color}`} href="https://dropdeck.freshdesk.com/" target="_new">Support</Button>
          {/* <Button startIcon={<AccountCircleIcon/>} component={Link} variant="text" to="/configure" className={`${classes.button} ${classes.color}`}>Configure</Button> */}
          <Button startIcon={<ExitToApp/>} variant="text" className={classes.button} color="primary" onClick={logout}>Exit</Button>
        </Section>
      </Popup>
    </>
  );
};
export default ProfileMenu;

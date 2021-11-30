import React, { useState } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/styles';
import Button from "@material-ui/core/Button";
import { ThemeFactory } from "../../../common/theme/ThemeFactory";

const useStyles = makeStyles(() => ({
  button: {
    color: '#ccc',
    '& :hover': {
      color: '#fff',
    },
  },
}));

/**
 * Menu to toggle which theme to use for the slide deck.
 */
const ThemeMenu = ({ setThemeName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedName, setSelectedName] = useState(ThemeFactory.DEFAULT_THEME_NAME);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function changeTheme(event, themeKey) {
    setAnchorEl(null);
    setSelectedName(themeKey);
    setThemeName(themeKey);
  }

  const themes = ThemeFactory.instance.themes()
    .map(([key, entry]) => (
      <MenuItem
        style={{ background: "rgba(25, 25, 25, .7)", color: "#ccc" }}
        key={`theme-select-${key}`}
        selected={key === selectedName}
        onClick={(e) => changeTheme(e, key, entry)}
      >
        <div>{entry.component.name} {entry.component.branded ? <PeopleIcon style={{ position: "relative", top: 2, left: 4, fontSize: 14 }}/> : null}</div>
      </MenuItem>
    ));

  const classes = useStyles();
  const displayName = () => ThemeFactory.instance.get(selectedName).component.name;

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="simple-menu"
        aria-label="theme"
        aria-haspopup="true"
        variant="text"
        onClick={handleClick}>
        {displayName()}{ThemeFactory.instance.get(selectedName).component.branded ? <PeopleIcon style={{ position: "relative", top: -1, left: 10, fontSize: 20 }}/> : null}
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {themes}
      </Menu>
    </div>
  );
};

export default ThemeMenu;

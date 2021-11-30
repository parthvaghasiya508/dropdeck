import React from "react";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const renderMenuItem = (option, index, disabled, handleMenuItemClick, chosenTypes) => {
  const { text, icon, divider, type, description } = option;
  if (divider) {
    return <div key={`divider-${index}`}><Divider /></div>;
  }
  const disableItem = (typeof disabled === 'function') ? disabled(type) : disabled;
  return type !== null && (
    <MenuItem
      selected={chosenTypes && chosenTypes !== null && chosenTypes.includes(type)}
      disabled={disableItem}
      key={`option-${type}`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={(event) => handleMenuItemClick(event, option, index)}
      dense
    >
      { icon && (
        <ListItemIcon>
          <IconButton size="small">
            { icon }
          </IconButton>
        </ListItemIcon>
      )}
      <ListItemText primary={text} secondary={description} />
    </MenuItem>
  );
};

export const AdditionalStylesMenu = ({
  multiSelect = false,
  anchorEl,
  setAnchorEl,
  styles,
  chosenTypes,
  onSelect,
  disabled,
  onClose,
  className,
}) => {

  const handleMenuItemClick = (event, option) => {
    event.preventDefault();
    if (!multiSelect) {
      if (onClose) {
        onClose();
      }
      setAnchorEl(null);
    }
    onSelect(event, option.type);
  };

  const handleClose = (event) => {
    if (onClose) {
      onClose(event);
    }
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
    event.preventDefault();
  };

  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      keepMounted
      onClose={handleClose}
      style={{ zIndex: 100 }}
    >
      <div className={className}>
        {styles.map((option, index) => (
          renderMenuItem(option, index, disabled, handleMenuItemClick, chosenTypes)
        ))}
      </div>
    </Menu>
  );
};

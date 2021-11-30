import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { AdditionalStylesMenu } from "./AdditionalStylesMenu";

export const AdditionalStylesToggle = ({
  disabled,
  styles,
  classes,
  menuClassName = '',
  chosenTypes,
  onSelect,
  multiSelect = false,
  onClose,
  parentAnchorEl = null,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(parentAnchorEl);
  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      onClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  useEffect(() => {
    if (parentAnchorEl && parentAnchorEl !== null) {
      setAnchorEl(parentAnchorEl);
    }
  }, [parentAnchorEl]);

  const disableMenu = (typeof disabled !== 'function') && disabled;

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        size="small"
        aria-controls="split-button-menu"
        aria-expanded={Boolean(anchorEl)}
        aria-label="more-styles"
        aria-haspopup="menu"
        onMouseDown={(event) => event.preventDefault()}
        onClick={handleClick}
        style={{ minWidth: 0 }}
        disabled={disableMenu}
        className="dropdownArrow MuiToggleButtonGroup-groupedHorizontal"
      >
        <ArrowDropDownIcon />
      </Button>
      <AdditionalStylesMenu
        onClose={onClose}
        disabled={disabled}
        multiSelect={multiSelect}
        chosenTypes={chosenTypes}
        styles={styles}
        onSelect={onSelect}
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        className={`${menuClassName} ${classes.styleMenu}`}
      />
    </React.Fragment>
  );
};

import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TitleRoundedIcon from "@material-ui/icons/TitleRounded";
import { Subject } from "@material-ui/icons";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import MathIcon from "@material-ui/icons/Functions";
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { AdditionalStylesToggle } from "../AdditionalStylesToggle";
import { CODE } from "../../../../../DeckEditor/modules/plugins/component/code/type";
import { HEADING_ONE } from "../../../../../DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../../../DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "../../../../../DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../../DeckEditor/modules/plugins/component/list/numbered/type";
import { MATH } from "../../../../../DeckEditor/modules/plugins/component/math/type";
import { BLOCK_QUOTE } from "../../../../../DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../../../../DeckEditor/modules/plugins/component/paragraph/type";

const blockStyles = [
  { type: HEADING_ONE, text: "Title", icon: <TitleRoundedIcon /> },
  { type: HEADING_TWO, text: "Subtitle", icon: <TitleRoundedIcon style={{ height: 14 }} /> },
  { type: PARAGRAPH, text: "Normal", icon: <Subject /> },
];

const otherStyles = [
  { type: BLOCK_QUOTE, text: "Quote", icon: <FormatQuoteRoundedIcon /> },
  { type: CODE, text: "Code", icon: <CodeRoundedIcon /> },
  { type: MATH, text: "Math", icon: <MathIcon /> }
];

const listStyles = [
  { type: BULLETED_LIST, text: "Bullets", icon: <FormatListBulletedRoundedIcon /> },
  { type: NUMBERED_LIST, text: "Numbered", icon: <FormatListNumberedRoundedIcon /> }
];

const baseStyles = [
  ...blockStyles,
  { divider: true },
  ...otherStyles
];

const extendedStyles = [
  ...blockStyles,
  { divider: true },
  ...listStyles,
  { divider: true },
  ...otherStyles
];

export const BlockFormattingButtonGroup = ({
  chosenType, toggleType, classes, disabled, compact = true,
}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const styles = compact ? extendedStyles : baseStyles;

  if (styles.length === 0) {
    return null;
  }

  let chosenStyle = compact ? styles[0] : { text: '', type: 'none' };
  if (chosenType && chosenType !== null && (!compact || chosenType !== PARAGRAPH)) {
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].type === chosenType) {
        chosenStyle = styles[i];
        break;
      }
    }
  }

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget);
    event.preventDefault();
  };

  if (compact) {
    const disableToggle = (typeof disabled === 'function') ? disabled(chosenStyle.type) : disabled;
    return (
      <ToggleButtonGroup
        value={chosenType}
        onMouseDown={(event) => event.preventDefault()}
        aria-label="text formatting"
        size="small"
      >
        <ToggleButton
          disabled={disableToggle}
          key={chosenStyle.type}
          onMouseDown={(event) => toggleType(event, chosenStyle.type)}
          value={chosenStyle.type}
          aria-label={chosenStyle.type}
          className="MuiToggleButtonGroup-groupedHorizontal">

          {chosenStyle.icon}

        </ToggleButton>
        <AdditionalStylesToggle
          menuClassName={classes.blockFormattingMenu}
          onClose={onMenuClose}
          parentAnchorEl={anchorEl}
          mixedTypes
          disabled={disabled}
          classes={classes}
          chosenTypes={[chosenType]}
          styles={styles}
          onSelect={toggleType}
        />
      </ToggleButtonGroup>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseDown={disabled ? null : handleClick}
      style={{ 
        minWidth: 0, 
        margin: 0,
        padding: 0,
      }}
    >
      <ButtonGroup
        value={chosenType}
        onMouseDown={(event) => event.preventDefault()}
        aria-label="text formatting"
        size="small"
      >
        <Button
          disabled={disabled}
          key={chosenStyle.type}
          onMouseDown={(evt) => evt.preventDefault()}
          value={chosenStyle.type}
          aria-label={chosenStyle.type}
          className="MuiToggleButtonGroup-groupedHorizontal blockTypes">
          {chosenStyle.text}
        </Button>
        <AdditionalStylesToggle
          menuClassName={classes.blockFormattingMenu}
          onClose={onMenuClose}
          parentAnchorEl={anchorEl}
          disabled={disabled}
          classes={classes}
          chosenTypes={[chosenType]}
          styles={styles}
          onSelect={toggleType}
        />
      </ButtonGroup>
    </div>
  );
};

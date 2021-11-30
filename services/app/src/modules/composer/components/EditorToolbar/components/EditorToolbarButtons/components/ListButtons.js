import React from "react";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { BULLETED_LIST } from "../../../../DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../../DeckEditor/modules/plugins/component/list/numbered/type";

const listTypes = [BULLETED_LIST, NUMBERED_LIST];

const ListButtons = ({ disabled, chosenType, toggleType }) => (
  <ToggleButtonGroup
    exclusive
    value={listTypes}
    onMouseDown={(event) => event.preventDefault()}
    aria-label="list formatting"
    size="small"
  >
    <ToggleButton
      disabled={disabled}
      value={BULLETED_LIST}
      variant="outlined"
      size="small"
      aria-label={BULLETED_LIST}
      onMouseDown={(event) => toggleType(event, BULLETED_LIST)}
      selected={chosenType === BULLETED_LIST}
    >
      <FormatListBulletedIcon />
    </ToggleButton>

    <ToggleButton
      disabled={disabled}
      value={NUMBERED_LIST}
      variant="outlined"
      size="small"
      aria-label={NUMBERED_LIST}
      onMouseDown={(event) => toggleType(event, NUMBERED_LIST)}
      selected={chosenType === NUMBERED_LIST}
    >
      <FormatListNumberedIcon />
    </ToggleButton>

  </ToggleButtonGroup>

);
export default ListButtons;

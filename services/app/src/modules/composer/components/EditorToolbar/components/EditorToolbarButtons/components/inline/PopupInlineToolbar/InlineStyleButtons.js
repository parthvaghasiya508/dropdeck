import ToggleButton from "@material-ui/lab/ToggleButton";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import CodeIcon from "@material-ui/icons/Code";
import FunctionsIcon from "@material-ui/icons/Functions";
import { currentMarks } from "../../../../../transforms/currentMarks";
import { updateInlineStyleSelection } from "../../../../../transforms/updateInlineStyleSelection";
import {
  BOLD,
  CODE_MARK,
  EMPHASIS,
  ITALIC,
  MATH_MARK,
  STRIKETHROUGH,
  UNDERLINE
} from "../../../../../../DeckEditor/modules/plugins/component/marks/Marks";

const InlineStyleButtons = ({ editor, extended = false, disabled }) => {

  const selectInlineMarks = updateInlineStyleSelection(editor);
  const inlineMarks = currentMarks(editor);

  // We only allow math marks on their own.
  const disableMathToggle = disabled || (inlineMarks !== null && (inlineMarks.length > 1 || (inlineMarks.length === 1 && inlineMarks[0] !== MATH_MARK)));
  const hasMathFormatting = (inlineMarks !== null && inlineMarks.length === 1 && inlineMarks[0] === MATH_MARK);
  const disableTextFormatting = disabled || hasMathFormatting;

  const buttons = extended ? [
    <ToggleButton key={BOLD} value={BOLD} aria-label={BOLD} disabled={disableTextFormatting}>
      <FormatBoldIcon/>
    </ToggleButton>,
    <ToggleButton key={ITALIC} value={ITALIC} aria-label={ITALIC} disabled={disableTextFormatting}>
      <FormatItalicIcon/>
    </ToggleButton>,
    <ToggleButton key={UNDERLINE} value={UNDERLINE} aria-label={UNDERLINE} disabled={disableTextFormatting}>
      <FormatUnderlinedIcon/>
    </ToggleButton>,
    <ToggleButton key={STRIKETHROUGH} value={STRIKETHROUGH} aria-label={STRIKETHROUGH} disabled={disableTextFormatting}>
      <FormatStrikethroughIcon/>
    </ToggleButton>,
    <ToggleButton key={EMPHASIS} value={EMPHASIS} aria-label={EMPHASIS} disabled={disableTextFormatting}>
      <BrightnessHighIcon />
    </ToggleButton>,
    <ToggleButton key={CODE_MARK} value={CODE_MARK} aria-label={CODE_MARK} disabled={disableTextFormatting}>
      <CodeIcon/>
    </ToggleButton>,
    <ToggleButton key={MATH_MARK} value={MATH_MARK} aria-label={MATH_MARK} disabled={disableMathToggle}>
      <FunctionsIcon/>
    </ToggleButton>
  ] : [
    <ToggleButton key={BOLD} value={BOLD} aria-label={BOLD} disabled={disableTextFormatting}>
      <FormatBoldIcon/>
    </ToggleButton>,
    <ToggleButton key={ITALIC} value={ITALIC} aria-label={ITALIC} disabled={disableTextFormatting}>
      <FormatItalicIcon/>
    </ToggleButton>,
    <ToggleButton key={UNDERLINE} value={UNDERLINE} aria-label={UNDERLINE} disabled={disableTextFormatting}>
      <FormatUnderlinedIcon/>
    </ToggleButton>
  ];

  return (
    <ToggleButtonGroup
      value={inlineMarks}
      onChange={selectInlineMarks}
      onMouseDown={(event) => event.preventDefault()}
      aria-label="text formatting"
      size="small"
      className="inlineStyleButtons">
      { buttons }
    </ToggleButtonGroup>
  );
};
export default InlineStyleButtons;

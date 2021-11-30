import React, { useCallback } from "react";
import { Editor } from "slate";
import ToggleButton from "@material-ui/lab/ToggleButton";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough";
import { FaHighlighter } from "react-icons/fa";

import CodeIcon from "@material-ui/icons/Code";
import FunctionsIcon from "@material-ui/icons/Functions";
import InsertLinkIcon from '@material-ui/icons/InsertLink';

import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import difference from "lodash.difference";
import { AdditionalStylesToggle } from "../AdditionalStylesToggle";
import { currentMarks } from "../../../../transforms/currentMarks";
import {
  BOLD,
  CODE_MARK,
  EMPHASIS,
  ITALIC,
  MATH_MARK,
  STRIKETHROUGH,
  UNDERLINE
} from "../../../../../DeckEditor/modules/plugins/component/marks/Marks";
import { LINK } from "../../../../../DeckEditor/modules/plugins/component/link/type";
import { useEditorOperations } from "../../../../../DeckEditor/hooks/useEditorOperations";

const additionalMarks = [
  { type: LINK, icon: <InsertLinkIcon/>, text: "Link" },
  { type: ITALIC, icon: <FormatItalicIcon/>, text: "Italic" },
  { type: UNDERLINE, icon: <FormatUnderlinedIcon/>, text: "Underline" },
  { type: STRIKETHROUGH, icon: <FormatStrikethroughIcon/>, text: "Strikethrough" },
  { type: CODE_MARK, icon: <CodeIcon/>, text: "Code" },
  { type: MATH_MARK, icon: <FunctionsIcon/>, text: "Math" },
];

const updateMarks = (editor, inlineMarks, setInlineMarks) => (event, selection) => {
  event.preventDefault();
  const marks = inlineMarks || [];
  if (marks !== null) {
    const remove = difference(marks, selection);
    remove.forEach((style) => Editor.removeMark(editor, style));
  }
  selection.forEach((style) => Editor.addMark(editor, style, true));
  setInlineMarks(currentMarks(editor));
};

const toggleMark = (editor, inlineMarks, setInlineMarks) => (event, mark) => {
  event.preventDefault();
  const marks = inlineMarks || [];
  if (marks.includes(mark)) {
    Editor.removeMark(editor, mark);
  } else {
    Editor.addMark(editor, mark, true);
  }
  setInlineMarks(currentMarks(editor));
};
const InlineStyleButtonGroup = ({
  editor,
  disabled,
  classes,
  inlineMarks = [],
  setInlineMarks
}) => {

  const { toggleLinkMenu } = useEditorOperations();

  // We only allow math marks on their own.
  // const disableMathToggle = disabled || (inlineMarks !== null && (inlineMarks.length > 1 || (inlineMarks.length === 1 && inlineMarks[0] !== MATH_MARK)));

  const hasMathFormatting = (inlineMarks !== null && inlineMarks.length === 1 && inlineMarks[0] === MATH_MARK);
  const disableTextFormatting = disabled || hasMathFormatting;

  const onChange = useCallback(updateMarks(editor, inlineMarks, setInlineMarks), [inlineMarks]);
  const toggleCallback = useCallback(toggleMark(editor, inlineMarks, setInlineMarks), [inlineMarks]);
  const handleFormattingAction = (event, mark) => {
    if (mark === LINK) {
      event.preventDefault();
      toggleLinkMenu();
    } else {
      toggleCallback(event, mark);
    }
  };
  return (
    <ToggleButtonGroup
      value={inlineMarks}
      onChange={onChange}
      onMouseDown={(event) => event.preventDefault()}
      aria-label="text formatting"
      size="small"
      className="inlineStyleButtons">

      <ToggleButton key={EMPHASIS} value={EMPHASIS} aria-label={EMPHASIS} disabled={disableTextFormatting}>
        <FaHighlighter style={{ height: "0.9em", marginTop: -1 }}/>
      </ToggleButton>
      <ToggleButton key={BOLD} value={BOLD} aria-label={BOLD} disabled={disableTextFormatting}>
        <FormatBoldIcon/>
      </ToggleButton>,

      <AdditionalStylesToggle
        multiSelect={false}
        disabled={disabled}
        classes={classes}
        chosenTypes={inlineMarks}
        styles={additionalMarks}
        onSelect={handleFormattingAction}
      />

    </ToggleButtonGroup>
  );
};
export default InlineStyleButtonGroup;

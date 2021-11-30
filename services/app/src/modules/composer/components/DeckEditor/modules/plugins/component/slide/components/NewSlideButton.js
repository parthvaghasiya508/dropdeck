import { IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import React, { useCallback, useState } from "react";
import { isMacOs } from "react-device-detect";
import { ReactEditor, useEditor } from "slate-react";
import { userSelectStyles } from "../../../../../../../../../common/util/StyleHelpers";
import { MAX_SCALING } from "../../../../../../../../presenter/components/Slide/scalingLimits";
import { CLASS_NOT_COPIED } from "../../../deserializers/html/withDeserializeHtml";
import { HEADING_ONE } from "../../heading/one/type";
import { newSlideButtonStyles } from "./NewSlideButton.styles";

const SCALING_STARTS = MAX_SCALING;
const MAX_SCALING_WARNING = 0.6 * MAX_SCALING;

const NewSlideButton = ({ splitSlide, scaling, splitLocation, lastSlide = false }) => {

  const editor = useEditor();
  const useStyles = useCallback(newSlideButtonStyles(), []);
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const onClick = (ev) => {
    splitSlide({ at: splitLocation, openingElement: HEADING_ONE });
    ReactEditor.focus(editor);
    ev.preventDefault();
  };

  const className = `${classes.root} ${CLASS_NOT_COPIED} new-slide-container ${scaling < SCALING_STARTS && !lastSlide ? "scaling" : ""} ${scaling < MAX_SCALING_WARNING ? "max" : ""}`;
  return (
    <div contentEditable={false} style={userSelectStyles} className={className} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <span className="new-slide-group" role="button" tabIndex="0" onClick={onClick}>
        <IconButton style={userSelectStyles} className={`${classes.button} new-slide-button`}>
          <AddIcon/>
        </IconButton>
        <span style={userSelectStyles} className="new-slide-label" data-pseudo-content="New slide" />
        <span style={userSelectStyles} className="new-slide-message" data-pseudo-content="Slide break?" />
        <span style={{ userSelect: 'none', opacity: visible ? 0.4 : 0, marginLeft: 4 }} className={`${classes.text} new-slide-helper-text`} data-pseudo-content={`${isMacOs ? "⌘" : "^"} + Enter`} />
      </span>
    </div>
  );
};
export default NewSlideButton;

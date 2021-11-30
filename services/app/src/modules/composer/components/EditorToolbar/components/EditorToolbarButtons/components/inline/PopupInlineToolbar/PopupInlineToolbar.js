import { useSlate } from "slate-react";
import { Range } from "slate";
import React, { useCallback, useEffect, useState } from 'react';
import { isSelectionExpanded } from "@udecode/slate-plugins";

import Popup from "../../../../../../../../../common/components/popup/Popup/Popup";
import { getSelectionText } from "../../../../../../DeckEditor/queries/getSelectionText";
import editorToolbarStyles from "../../../../../EditorToolbarStyles";
import { updateToolbarPlacement } from "./transforms/updateToolbarPlacement";
import InlineStyleButtons from "./InlineStyleButtons";

export const PopupInlineToolbar = ({ activeSelection = false }) => {

  const editor = useSlate();
  const selectionExpanded = isSelectionExpanded(editor);
  const selectionText = getSelectionText(editor);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const useEditorToolbarStyles = useCallback(editorToolbarStyles(), []);
  const classes = useEditorToolbarStyles();
  const [placement, setPlacement] = useState("top");

  useEffect(() => {
    if (!activeSelection && editor.selection && Range.isRange(editor.selection) && selectionExpanded && selectionText) {
      updateToolbarPlacement(editor, setPlacement, setAnchorEl);
    } else {
      setAnchorEl(null);
    }
  }, [activeSelection, selectionExpanded, selectionText]);

  return anchorEl && (
    <Popup
      instant
      defaultPlacement={placement}
      anchor={anchorEl}
      setAnchor={() => {}} // we will handle hiding the popup ourselves
      width="auto" // todo find a good value here
      style={{ boxShadow: 'none', padding: 0, borderRadius: 6 }}
      open={open}>

      <div className={classes.controls}>
        <InlineStyleButtons editor={editor} extended />
      </div>
    </Popup>
  );
};

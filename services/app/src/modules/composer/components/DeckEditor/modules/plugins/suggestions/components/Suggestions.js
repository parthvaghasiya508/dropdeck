import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactEditor } from 'slate-react';
import { useTheme } from "@material-ui/core";
import { Editor, Node, Transforms } from 'slate';
import "./Suggestions.scss";
import { EditorTransforms } from "../../../../services/transforms/EditorTransforms";
import { SuggestedMatch } from "../SuggestedMatch";
import Popup from "../../../../../../../../common/components/popup/Popup/Popup";
import { suggestionsStyles } from "./Suggestions.styles";
import { ContextMenu } from "../../../../components/ContextMenu/ContextMenu";
import { SuggestionsDropdownMenu } from "./SuggestionsDropdownMenu";

export const Suggestions = ({ editor, match, setMatch, onSelectionTrigger }) => {
  const suggestions = match.suggestions();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const activeItemRef = useRef();
  const containerRef = useRef();

  const { target, index, keyboardIndex, anchor } = match;

  useEffect(() => {
    if (target && suggestions.length > 0) {
      if (anchor) {
        setAnchorEl(anchor);
        return;
      }
      const node = EditorTransforms.activeNode(editor);
      if (!node) {
        return;
      }
      const el = ReactEditor.toDOMNode(editor, node);
      if (!el) {
        return;
      }
      setAnchorEl(el);
    } else {
      setAnchorEl(null);
    }
  }, [suggestions, match, anchor]);

  useEffect(() => {
    if (activeItemRef.current && containerRef.current) {
      const { offsetTop } = activeItemRef.current;
      const computedStyle = window.getComputedStyle(containerRef.current);

      if (offsetTop < containerRef.current.scrollTop) {
        const paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top').replace('px', ''));
        containerRef.current.scrollTo({ top: offsetTop - paddingTop });
      } else if (offsetTop - containerRef.current.scrollTop + activeItemRef.current.clientHeight > containerRef.current.clientHeight) {
        const paddingBottom = parseFloat(computedStyle.getPropertyValue('padding-bottom').replace('px', ''));
        containerRef.current.scrollTo({ top: offsetTop - containerRef.current.clientHeight + activeItemRef.current.clientHeight + paddingBottom });
      }
    }
  }, [activeItemRef.current]);

  const onClose = () => {
    setAnchorEl(null);
    setMatch(new SuggestedMatch({}));
  };

  const onClick = (index) => (event) => {
    const { link } = suggestions[index];
    event.preventDefault();
    if (link) {
      window.open(
        link,
        '_blank',
      );
      setMatch(new SuggestedMatch({}));
    } else {
      match.index = index;
      onSelectionTrigger(match);
      const focus = match.focus || target;
      try {
        const [lastNode, lastPath] = Editor.last(editor, focus);
        if (lastNode && lastPath) {
          Transforms.select(editor, { path: lastPath, offset: Node.string(lastNode).length });
        }
      } catch (e) {
        // could be that the focus is no longer valid
      }
    }
    ReactEditor.focus(editor);

  };

  const useStyles = useCallback(suggestionsStyles(), []);
  const classes = useStyles();

  return (target && suggestions.length > 0) ? (
    <Popup
      instant
      defaultPlacement="bottom"
      anchor={anchorEl}
      setAnchor={setAnchorEl}
      onClose={onClose}
      open={open}
      width={266}
      color={theme.palette.popover.chevronAlt}
    >
      <SuggestionsDropdownMenu
        classes={classes}
        index={index}
        onClick={onClick}
        suggestions={suggestions}
        activeItemRef={activeItemRef}
        containerRef={containerRef}
        keyboardIndex={keyboardIndex}
      />
    </Popup>
  ) : null;
};

import React, { useEffect, useState } from 'react';
import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import GenericButton from "../../../../../../common/components/buttons/GenericButton";
import GenericButtonGroup from "../../../../../../common/components/buttons/GenericButtonGroup";
import Popup from "../../../../../../common/components/popup/editor/Popup";
import Section from "../../../../../../common/components/popup/editor/Section";
import TextField from "../../../../../../common/components/popup/editor/TextField";
import { isValidLinkSelection } from "../../modules/plugins/component/link/queries/isValidLinkSelection";
import { removeLinkAtSelection } from "../../modules/plugins/component/link/transforms/removeLinkAtSelection";
import { setLinkAtSelection } from "../../modules/plugins/component/link/transforms/setLinkAtSelection";
import { LINK } from "../../modules/plugins/component/link/type";
import { isURL, isURLWithoutProtocol } from "../../modules/plugins/deserializers/url/transforms/isUrl";
import { EditorTransforms } from "../../services/transforms/EditorTransforms";
import SelectionReference from "../../utils/SelectionReference";
import MountHandlerToKeyDown from "../../keyDownHandlers/onKeyDownMountHandler"; 

export const LinkSettings = ({ editor, closeMenu, target, initialUrl, showCancelButton = true, addButtonText = "Apply", initialText, sectionStyle }) => {
  const { selection } = editor;
  const selectedText = selection && selection !== null ? Editor.string(editor, selection) : '';
  const activeNode = EditorTransforms.activeElementNode(editor);
  const existingLink = activeNode && activeNode.type === LINK;
  const selectedUrl = existingLink ? activeNode.url : '';
  const [text, setText] = useState(initialText || selectedText);
  const [url, setUrl] = useState(initialUrl || selectedUrl);
  const [urlError, setUrlError] = useState(false);

  const removeLink = (e) => {
    e.preventDefault();
    Transforms.select(editor, target);
    removeLinkAtSelection(editor);
    closeMenu();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!(isURL(url) || isURLWithoutProtocol(url))) {
      setUrlError(true);
      return;
    }
    Transforms.select(editor, target);
    setLinkAtSelection(editor, url, text);
    closeMenu();
  };

  return (
    <form onSubmit={onSubmit} autoCorrect="off" autoComplete="off">
      <Section style={sectionStyle}>
        <div>
          <TextField
            label="Link to"
            placeholder="URL of the page, or resource"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
            autoFocus
          />

          <TextField
            label="Label"
            placeholder="Text to show for the link"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
      </Section>
      <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
        <div>
          <GenericButton conditional={existingLink} disabled={!existingLink} aria-label="remove" onClick={removeLink}>Remove</GenericButton>
        </div>
        <GenericButtonGroup>
          <GenericButton aria-label="cancel" onClick={closeMenu}>Cancel</GenericButton>
          <GenericButton primary submit aria-label="add">{addButtonText}</GenericButton>
        </GenericButtonGroup>
      </div>
    </form>
  );
};

export const LinkMenu = ({ editor, closeMenu }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [target, setTarget] = useState();

  const onClose = () => {
    setAnchorEl(null);
    closeMenu();
  };

  MountHandlerToKeyDown('Escape', onClose);

  useEffect(() => {
    if (isValidLinkSelection(editor)) {
      const currentSelection = editor.selection;
      const domRange = ReactEditor.toDOMRange(editor, currentSelection);
      if (!domRange) {
        setAnchorEl(null);
      }
      setAnchorEl(new SelectionReference(domRange));
      setTarget(currentSelection);

    } else {
      setAnchorEl(null);
    }
    
  }, [editor.selection]);

  return anchorEl && (
    <Popup anchor={anchorEl} onClose={onClose} open={open}>
      <LinkSettings editor={editor} closeMenu={closeMenu} target={target} />
    </Popup>
  );
};

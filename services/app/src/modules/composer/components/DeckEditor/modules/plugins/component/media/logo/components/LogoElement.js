/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import { useEditor } from "slate-react";
import { useTheme } from '@material-ui/core';
import { EditorTransforms } from "../../../../../../services/transforms/EditorTransforms";
import { imageComposerStyles, imageWrapperStyles } from "../../MediaStyles";
import { toggleSelection } from '../../components/UnselectMedia';

export const LogoElement = (props) => {
  const { element, children, attributes } = props;
  const editor = useEditor();
  const selected = EditorTransforms.isSelected(editor, element);
  const { url, whiteOnTransparent, bgColor, colors } = element.settings;
  const backgroundColor = whiteOnTransparent ? bgColor || colors?.accent : null;
  const theme = useTheme();

  if (url !== undefined) {
    return (
      <div style={imageComposerStyles(selected, theme, backgroundColor)}>
        <div style={imageWrapperStyles(url, { backgroundSize: 'contain', transform: 'scale(0.75)', })} {...attributes} onMouseDown={(event) => toggleSelection(event, editor, selected)} aria-hidden="true">
          {children}
        </div>
      </div>
    );
  }
  return <div {...attributes}>{children}</div>;
};

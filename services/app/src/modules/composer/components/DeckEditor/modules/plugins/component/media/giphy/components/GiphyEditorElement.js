/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import { ReactEditor, useEditor } from "slate-react";
import { Editor, Transforms } from 'slate';
import { useTheme } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { EditorTransforms } from "../../../../../../services/transforms/EditorTransforms";
import { imageComposerStyles, imageWrapperStyles, replaceButtonStyles } from "../../MediaStyles";
import Giphy from "../../../../../../../../../../common/api/sdk/services/Giphy";
import MediaGrid from '../../components/MediaGrid/MediaGrid';
import GiphyBox from '../../components/GiphyGridElement';
import { toggleSelection } from '../../components/UnselectMedia';
import { processGiphyResults } from "../transforms/processGiphyResults";
import { GiphyFooter } from "./GiphyFooter/GiphyFooter";

export const GiphyEditorElement = (props) => {
  const { element, children, attributes } = props;
  const { settings } = element;
  const editor = useEditor();
  const selected = EditorTransforms.isSelected(editor, element);
  const path = ReactEditor.findPath(editor, element);
  const { url, label } = settings;
  const query = label;
  const [showGiphyModal, setGiphyModal] = useState(false);
  const theme = useTheme();
  const mediaElementStyles = replaceButtonStyles()();

  const updateImage = () => {
    setGiphyModal(true);
  };

  const onSubmitGiphy = (image, query) => {
    processGiphyResults(image, query)
      .then((imageNodes) => {
        Editor.withoutNormalizing(editor, () => {
          Transforms.removeNodes(editor,{ at: path });
          Transforms.insertNodes(editor, imageNodes, { at: path, select: true });
        });
      });
  };

  const onCancel = () => {
    setGiphyModal(false);
  };

  if (url !== undefined) {
    return (
      <div className={`${mediaElementStyles.imageContainer} ${selected && "active"}`}>
        <div className={mediaElementStyles.image} style={imageComposerStyles(selected, theme)}>
          {(showGiphyModal) ? (
            <MediaGrid
              service={Giphy}
              onSelectImage={(image, query) => onSubmitGiphy(image, query)}
              onCancel={onCancel}
              query={query}
              node={element}
              footer={<GiphyFooter/>}
              update>
              <GiphyBox />
            </MediaGrid>
          ) : ''}
          <div style={imageWrapperStyles(url)} {...attributes} onMouseDown={(event) => toggleSelection(event, editor, selected)} aria-hidden="true">
            {children}
          </div>
        </div>
        <div contentEditable={false} className="replace-container">
          <Button onClick={() => updateImage()} variant="text" size="small" data-pseudo-content="Replace Animation" />
        </div>
      </div>
    );
  }
  return <div {...attributes}>{children}</div>;
};

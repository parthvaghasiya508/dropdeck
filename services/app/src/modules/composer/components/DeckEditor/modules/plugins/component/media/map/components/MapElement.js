import React from 'react';
import { useEditor } from "slate-react";
import { useTheme } from "@material-ui/core";
import { EditorTransforms } from "../../../../../../services/transforms/EditorTransforms";
import { imageComposerStyles, imageWrapperStyles } from "../../MediaStyles";
import { config } from "../../../../../../../../../../config";

export const MapElement = (props) => {
  const { element, children } = props;
  const { location } = element.settings;
  const editor = useEditor();
  const selected = EditorTransforms.isSelected(editor, element);
  const theme = useTheme();

  // Interpret relative URLs relative to the API service.
  if (location !== undefined) {

    // Fetch a larger image than we will end up using to crop out the "Google" watermark.
    const url = getMapUrl(location, 100, 70, 9);

    return (
      <div style={imageComposerStyles(selected, theme)}>
        <span
          contentEditable={false}
          style={{
            pointerEvents: 'none',
            display: 'inline-block',
            maxWidth: '100%',
            opacity: '0.666',
          }}
        />
        <div style={imageWrapperStyles(url)}>
          {children}
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
};

const { apiKey } = config.elements.map.google;
const getMapUrl = (location, width, height, zoomLevel) => `https://maps.googleapis.com/maps/api/staticmap?maptype=terrain&center=${location}&zoom=${zoomLevel}&size=${width}x${height}&maptype=roadmap&key=${apiKey}`;

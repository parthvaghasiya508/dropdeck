import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
import { getColors, getImageUrl, getIsWhiteOnTransparent, getLabel } from "../../image/transforms/imageTransforms";

export class LogoSlideComponent extends SlideComponent {
  constructor({ node, monitor, deckId }) {
    super();
    const url = getImageUrl(node, deckId);
    const label = getLabel(node);
    const whiteOnTransparent = getIsWhiteOnTransparent(node);
    const colors = getColors(node);
    const bgColor = colors?.bgColor ? colors?.bgColor : whiteOnTransparent ? colors?.accent : null;

    if (url !== undefined) {
      this.setComponent(
        <ImageComponent
          url={url}
          label={label}
          onReady={monitor.watch(url)}
          editable
          imageSettings={node.settings}
          backgroundColor={bgColor}
          includeTransformWrappers={false}
        />
      );
    }
  }
}

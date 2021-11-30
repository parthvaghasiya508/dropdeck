import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { getImageUrl, getLabel } from "../transforms/imageTransforms";
import { unsplashUrlGenerator } from "./UnsplashImageComponent/unsplashUrlGenerator";
import { FROM_UNSPLASH } from "./ImageEditorElement";
import { isUnsplashUrl } from "../queries/isUnsplashUrl";

import { UnsplashImageComponent } from "./UnsplashImageComponent/UnsplashImageComponent";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
import { Slide } from "../../../../../../../../../../common/slide";
import { ImageEditor } from "../../components/ImageEditor/ImageEditor";

export class ImageSlideComponent extends SlideComponent {
  constructor({ node, view, monitor, deckId }) {
    super();

    const url = getImageUrl(node, deckId);
    if (url !== undefined) {
      const fromUnsplash = node?.settings?.from === FROM_UNSPLASH || isUnsplashUrl(url);
      const label = getLabel(node);
      if (fromUnsplash) {
        const urlGenerator = unsplashUrlGenerator(view, url);
        if (typeof urlGenerator === 'function') {
          this.setComponent(<UnsplashImageComponent dropTarget={view === Slide.View.DIRECTORY} urlGenerator={urlGenerator} label={label} onReady={monitor.watch(url)} settings={node.settings} />);
        } else {
          const fixedUrl = urlGenerator;
          if (view === Slide.View.LIGHTBOX || view === Slide.View.DIRECTORY) {
            this.setComponent(<ImageEditor url={fixedUrl} label={label} onReady={monitor.watch(fixedUrl)} settings={node.settings} />);
          } else {
            this.setComponent(<ImageComponent url={fixedUrl} label={label} onReady={monitor.watch(fixedUrl)} settings={node.settings} />);
          }
        }
      } else if (view === Slide.View.LIGHTBOX) {
        this.setComponent(<ImageEditor url={url} label={label} onReady={monitor.watch(url)} settings={node.settings} />);
      } else {
        this.setComponent(<ImageComponent url={url} label={label} onReady={monitor.watch(url)} settings={node.settings} />);
      }
    }
  }
}

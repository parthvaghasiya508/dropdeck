import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
import { Slide } from "../../../../../../../../../../common/slide";
import { IMAGE } from "../../image/type";

export class GiphySlideComponent extends SlideComponent {
  constructor({ node, view, monitor }) {
    super();
    this.setMarkupType(IMAGE); // render as an image

    const nodeSettings = node.settings;
    const gifUrl = nodeSettings?.gif;
    let url = nodeSettings?.url;
    if (gifUrl !== undefined && view === Slide.View.FULL) {
      url = gifUrl;
    }
    const label = nodeSettings?.label || 'Animation';

    const dropTarget = view === Slide.View.LIGHTBOX;
    if (gifUrl && gifUrl !== '') {
      if (view === Slide.View.FULL) {
        url = gifUrl;
        this.setComponent(
          <ImageComponent url={url} label={label} onReady={monitor.watch(url)} />
        );
      } else {
        const onMouseOver = (e) => {
          if (gifUrl && gifUrl !== '') e.currentTarget.src = gifUrl; else e.currentTarget.src = url;
        };
        const onMouseOut = (e) => {
          e.currentTarget.src = url;
        };
        this.setComponent(
          <ImageComponent
            dropTarget={dropTarget}
            url={url}
            label={label}
            onReady={monitor.watch(url)}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
          />
        );
      }
    } else {
      this.setComponent(
        <ImageComponent dropTarget={dropTarget} url={url} label={label} onReady={monitor.watch(url)} />
      );
    }
  }
}

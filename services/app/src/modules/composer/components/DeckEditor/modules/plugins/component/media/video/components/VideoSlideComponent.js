import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { Slide } from "../../../../../../../../../../common/slide/Slide";
import { getVideoUrl } from "../queries/getVideoUrl";

export class VideoSlideComponent extends SlideComponent {
  constructor({ node, view, monitor }) {
    super();
    const showVideo = (view === Slide.View.FULL);
    if (node.settings) {
      const { videoId, provider, label, thumbnail, url } = node.settings;
      let videoUrl = url;
      if (videoId !== undefined && provider !== undefined) {
        videoUrl = getVideoUrl(videoId, provider);
      }

      if (videoUrl !== undefined) {
        this.setComponent(<VideoPlayer showVideo={showVideo} thumbnail={thumbnail} label={label} url={videoUrl} onReady={monitor.watch(videoUrl)} />);
      }
    }
  }
}

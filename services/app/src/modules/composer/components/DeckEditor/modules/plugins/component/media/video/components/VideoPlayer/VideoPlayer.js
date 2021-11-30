import React, { useState } from "react";
import "./VideoPlayer.scss";
import PlayIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import TheatersIcon from '@material-ui/icons/Theaters';
import { imagePlaceholderUrl } from "../../../image/transforms/imagePlaceholderUrl";

export const VideoPlayer = ({ label, url, onReady, thumbnail = imagePlaceholderUrl(), showVideo }) => {
  const [videoShown, setVideoShown] = useState(!thumbnail);

  if (showVideo) {
    return (
      <React.Fragment>
        { thumbnail && !videoShown ? (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div className="videoThumbnail" onClick={() => setVideoShown(true)}><img alt={label} src={thumbnail} onLoad={onReady}/>
            <div className="videoThumbnailIconWrapper showVideo">
              <PlayIcon className="videoThumbnailIcon" />
            </div>
          </div>
        ) : null }
        <div className="videoContainer">
          {videoShown && (
            <iframe
              className="videoPlayer"
              title={label}
              src={url}
              frameBorder="0"
              gesture="media"
              allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          )}
        </div>
      </React.Fragment>
    );
  }

  if (thumbnail) {
    return (
      <div className="videoThumbnail"><img alt={label} src={thumbnail} onLoad={onReady} onError={onReady}/>
        <div className="videoThumbnailIconWrapper">
          {showVideo ? <PlayIcon className="videoThumbnailIcon" /> : <TheatersIcon className="videoThumbnailIconLightbox" />}
        </div>
      </div>
    );
  }
};

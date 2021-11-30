import React from "react";
import YouTubeIcon from '@material-ui/icons/YouTube';
import { VideoSlideComponent } from "./components/VideoSlideComponent";
import { renderElementVideo } from "./renderElementVideo";
import { videoConfigurator } from "./configuration/videoConfigurator";
import { promptForUrl } from "./configuration/promptForUrl";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { VIDEO } from "./type";
import { isVideoUrl } from "./queries/isVideoUrl";
import { VideoSmartPasteComponent } from "./components/VideoSmartPasteComponent/VideoSmartPasteComponent";

const ICON = <YouTubeIcon />;

export default class VideoComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: VIDEO,
      icon: ICON,
      editorComponent: renderElementVideo,
      slideComponent: VideoSlideComponent,
      metadata: {
        name: 'video',
        keywords: 'video,vimeo,youtube',
        description: 'Add a video to your slide',
      },
      configuration: {

        // Configuration workflow
        workflow: promptForUrl,

        // Turn the user's inputs into Slate elements: (data) => configurator
        builder: videoConfigurator,

      },
      pasteHandler: {
        matches: (url, contentType) => isVideoUrl(url, contentType),
        component: VideoSmartPasteComponent,
      },
      isVoid: true,
      styling: {
        width: '100%',
        height: '100%',
        padding: '0',
        overflow: 'hidden',
        '& .element': {
          width: '100%',
          height: '100%',
        },
      },
    });
  }
}

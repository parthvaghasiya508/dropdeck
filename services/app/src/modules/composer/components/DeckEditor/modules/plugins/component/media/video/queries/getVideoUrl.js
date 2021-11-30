import { PROVIDER_VIMEO } from "../vimeo/vimeoUrlHandler";
import { getVimeoVideoUrl } from "../vimeo/getVimeoVideoUrl";
import { PROVIDER_YOUTUBE } from "../youTube/youTubeUrlHandler";
import { getYouTubeVideoUrl } from "../youTube/getYouTubeVideoUrl";

export const getVideoUrl = (videoId, provider) => {
  switch (provider) {
    case PROVIDER_VIMEO:
      return getVimeoVideoUrl(videoId);
    case PROVIDER_YOUTUBE:
      return getYouTubeVideoUrl(videoId);
  }
};

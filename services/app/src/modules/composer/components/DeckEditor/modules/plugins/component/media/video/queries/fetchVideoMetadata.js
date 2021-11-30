import { vimeoUrlHandler } from "../vimeo/vimeoUrlHandler";
import { youTubeUrlHandler } from "../youTube/youTubeUrlHandler";

const PROVIDER_OTHER = "other";

export const fetchVideoMetadata = (url, resolve) => {
  if (vimeoUrlHandler.matches(url)) {
    return vimeoUrlHandler.fetchMetadata(url);
  }
  if (youTubeUrlHandler.matches(url)) {
    return youTubeUrlHandler.fetchMetadata(url);
  }
  return new Promise((resolve, reject) => resolve({ url, provider: PROVIDER_OTHER }));
};

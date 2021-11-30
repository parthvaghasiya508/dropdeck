import axios from "axios";

export const PROVIDER_VIMEO = 'vimeo';

const vimeoPattern = new RegExp('^(https?:\\/\\/)vimeo.com(\\/.+)?\\/([0-9]+)$', 'i');
export const vimeoUrlHandler = {
  matches: (url) => vimeoPattern.test(url),
  fetchMetadata: (url) => {

    const match = vimeoPattern.exec(url);
    if (match && match.length > 3) {
      const videoId = match[3];
      if (videoId) {
        return axios.get(`https://vimeo.com/api/v2/video/${videoId}.json`)
          .then((response) => {
            if (response.data && response.data.length > 0) {
              const thumbnail = response.data[0].thumbnail_large;
              const label = response.data[0].title;
              return {
                provider: PROVIDER_VIMEO,
                label,
                thumbnail,
                videoId,
              };
            }
          });
      }
    }
    return new Promise((resolve) => resolve());
  },
};

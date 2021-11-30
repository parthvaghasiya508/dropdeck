export const PROVIDER_YOUTUBE = 'youtube';

const youTubePattern = new RegExp('^(https?:\\/\\/)(www\\.)?(youtube.com\\/watch\\?v=|youtu.be\\/)([a-zA-Z0-9\\-_]+)(&.+)?$', 'i');
export const youTubeUrlHandler = {
  matches: (url) => youTubePattern.test(url),
  fetchMetadata: (url) => new Promise((resolve, reject) => {
    const match = youTubePattern.exec(url);
    if (match && match.length > 4) {
      const videoId = match[4];
      if (videoId) {
        const thumbnail = `http://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const label = 'YouTube video';
        resolve({
          provider: PROVIDER_YOUTUBE,
          label,
          thumbnail,
          videoId,
        });
      }
    }
    reject();
  }),
};

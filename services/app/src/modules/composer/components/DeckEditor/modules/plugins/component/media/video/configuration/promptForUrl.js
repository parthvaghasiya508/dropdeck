import { prompt } from "../../../../../prompt/Prompt";
import { input } from "../../../../../prompt/Question";
import { isVideoUrl } from "../queries/isVideoUrl";

export const promptForUrl =
  prompt(
    input('Paste in a link to your video.', 'YouTube or Vimeo, full URL'),
    {
      submit: (url, resolve, reject) => {
        if (isVideoUrl(url)) {
          resolve(url);
        } else {
          reject(input(`Sorry, that didn't work.`, 'Enter a valid, public video URL'));
        }
      },
    }
  );

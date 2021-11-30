import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { video } from "../../../match/Matchers";
import { once } from "../../../match/expressions/Occurring";

/**
 * v1: Full Screen Video
 */
export const videoFullScreenRemix = new Remix('video-full', {
  background: '#000',
  padding: '0',
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  '& .videoContainer': {
    flexFlow: 'row',
    '& iframe': {
      width: '100%',
    },
  },
},
when(
  video(once)
).score(1.3), { featured: true });

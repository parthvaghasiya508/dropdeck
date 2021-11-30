import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { label, text, video } from "../../../match/Matchers";
import { anyNumber, atLeast, once } from "../../../match/expressions/Occurring";

/**
 * v2: Centered Text + Video
 */
export const videoTextRemix = new Remix('video-text', {
  padding: '4.5%',
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  // video
  '& .container-video': {
    boxSizing: 'border-box',
    padding: '0.5em',
    position: 'relative',
    zIndex: '1',
    maxHeight: '20.5em',
  },
  '& .videoContainer': {
    zIndex: '1',
    position: 'relative',
    flexFlow: 'row',
    '& iframe': {
      width: '100%',
    },
  },
  // GROUP TEXT
  '& .group-text-after, & .group-text-before': {
    overflow: 'hidden',
    zIndex: '2',
    fontSize: '95%',
    marginTop: '0.5em',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    '& .container': {
      width: '100%',
      textAlign: 'center',
      '&:first-of-type': {
        '& .element': { 
          '& h1, & h2, & p': { 
            paddingTop: '0.25em',
          },
        },
      },
      '&:last-of-type': {
        '& .element': { 
          '& h1, & h2, & p': { 
            paddingBottom: '0.25em',
            marginBottom: '0', 
          },
        },
      },
    },
    '& h1': { marginBottom: '0.25em', },
  },
  '& .group-text-before, & .group-text-before-logo': {
    marginTop: '0',
    marginBottom: '0.5em',
  },

},[
  when(
    label(text(atLeast(1)), "group-text-before"),
    video(once),
    label(text(anyNumber), "group-text-after"),
  ),

  when(
    label(text(anyNumber), "group-text-before"),
    video(once),
    label(text(atLeast(1)), "group-text-after"),
  )
], {
  scalingSelector: '.group-text-before, .group-text-after',
});

import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, inOrder, label, or, plainText, video } from "../../../match/Matchers";
import { anyNumber, atLeast, once } from "../../../match/expressions/Occurring";

/**
 *  v4: Image as Slide BG
 */
export const videoImageRemix = new Remix('video-image', {
  padding: '4.5%',
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  // image
  '& .container-image': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    '& .imgWrap img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      opacity: '0.25',
    },
  },
  // video
  '& .container-video': {
    boxSizing: 'border-box',
    padding: '0.5em',
    position: 'relative',
    zIndex: '1',
    maxHeight: '20em', // needed for scaling
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

},

when(
  label(plainText(anyNumber), "group-text-before"),
  or(
    inOrder(video(once), image(once)),
    inOrder(image(once), video(once)),
  ),
  label(plainText(anyNumber), "group-text-after"),
), {
  scalingSelector: '.group-text-before, .group-text-after',
});

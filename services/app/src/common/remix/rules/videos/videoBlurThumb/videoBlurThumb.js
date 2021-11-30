import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { label, plainText, video } from "../../../match/Matchers";
import { atLeast, once } from "../../../match/expressions/Occurring";

/**
 * v3: Blurred Thumb as Slide BG
 */
export const videoBlurThumbRemix = new Remix('video-blurthumb', {
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  '& .group-text': {
    width: '100%',
    margin: '0 0 1em 0',
    zIndex: '2',
    '& h1, & h2, & p': {
      margin: '0 !important',
    },
  },
  '& .group-text[data-length="1"]': {
    '& h1, & h2': {
      lineHeight: '1',
    },
  },
  '& .container-video + .group-text': {
    margin: '1em 0 0 0',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-block-quote, & .container-bulleted-list, & .container-numbered-list': {
    zIndex: '2',
    textShadow: '0 1px 0px rgba(0,0,0,0.25)',
    '& h1, & h2, & p, & li, & li:before, & blockquote': {
      color: '#fff',
    },
  },
  '& .container-video': {
    "-webkit-transform": "none", // no flicker fix on this element as it breaks layout
    '& *': {
      "-webkit-transform": "translateZ(0)", // flicker fix
    },
  },
  '& .videoThumbnail': {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    zIndex: '1',
    '&:before': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      zIndex: '2',
      background: 'radial-gradient(at center center, rgba(54, 56, 58, 0.5) 0%, rgba(25, 30, 35, 0.5) 60%, rgba(0, 0, 0, 0.6) 90%)',
      backdropFilter: 'blur(2.5em) saturate(1.8) brightness(0.9) contrast(1.35)',
      content: '""',
    },
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  },
  '& .videoContainer': {
    zIndex: '1',
    position: 'relative',
    flexFlow: 'row',
    '& iframe': {
      width: '100%',
    },
  },
},
when(
  label(plainText(atLeast(1)), "group-text"),
  video(once)
));

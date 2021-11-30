import { Remix } from "../../../Remix";
import { anyNumber, atLeast, once } from "../../../match/expressions/Occurring";
import { cluster, inOrder, logo, media, or, textList, allText, label } from "../../../match/Matchers";
import { when } from "../../../match/RemixRule";

/**
 * Declare the CSS generated for this remix.
 */
const css = {
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math': {
    width: '45%',
    textAlign: 'left',
    alignSelf: 'flex-start !important',
  },
  '& .container-paragraph + .container-heading-one': {
    marginTop: '1.5em',
  },
  '& .container-paragraph + .container-heading-two': {
    marginTop: '2em',
  },
  '& .container-block-quote': {
    width: '40%',
  },
  '& .container-image, .container-logo, .container-video': {
    position: 'absolute',
    width: '39% !important',
    top: '13%',
    bottom: '0',
    right: '7%',
    margin: '0 !important',
    height: 'auto !important',
    maxHeight: '74%',
    '& .element': {
      width: '100% !important',
      alignSelf: 'flex-end !important',
      margin: '0 !important',
      '& .imgWrap img': {
        objectFit: 'contain',
      },
    },
  },

  '& .container-logo': {
    background: '#fff',
    border: '0.025em solid rgba(0,0,0,0.075)',
    '& .element': {
      width: '100% !important',
      '& .imgWrap img': {
        objectFit: 'contain',
        maxWidth: '75%',
      },
    },
  },

  '& .container-video': {
    width: '42% !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .element': {
      display: 'contents',
    },
    '& .videoContainer': {
      maxHeight: '50%',
      width: '100%',
      '& .videoPlayer': {
        height: '100%',
      },
    },
  },
  '& .container-logo .imgWrap img': {
    padding: '25% 0',
  },
  // cluster + nested cluster
  '& .cluster': {
    width: '45%',
    '& .container': { width: '100%' },
    '& .cluster': { width: '100%' },
  },
  // sequence contains cluster
  '& .sequence': {
    width: '45%',
    '& .cluster': { width: '100%' },
  },
  '& .cluster + .container-image + .cluster': {
    margin: '-0.75em 0 0 0',
  },
  // Math
  '& .container-math': {
    margin: '0 0 0.5em 0', 
    '& .katex-display': {
      margin: '0', 
    },
  },
  // Code
  '& .container-code': {
    margin: '0 0 1em 0', 
  },

  '& .group.img-text': {
    overflow: 'hidden',
    width: '45%',
    '& .container': {
      width: '100%',
    },
  },
  
};

/**
 * ti2: 50t/50i aspect ratio maintained single image.
 */

export const IMG_TEXT_LABEL = "img-text";

export const textImage5050AspectRemix = new Remix('textimage-5050-aspect', css,[

  when(
    or(
      inOrder(
        label(allText(atLeast(1)), IMG_TEXT_LABEL),
        media(once),
        label(allText(anyNumber), IMG_TEXT_LABEL),
      ),
      inOrder(
        label(allText(anyNumber), IMG_TEXT_LABEL),
        media(once),
        label(allText(atLeast(1)), IMG_TEXT_LABEL),
      ),
    )
  ),
  when(
    or(
      inOrder(
        label(allText(atLeast(1)), IMG_TEXT_LABEL),
        logo(once),
        label(allText(anyNumber), IMG_TEXT_LABEL),
      ),
      inOrder(
        label(allText(anyNumber), IMG_TEXT_LABEL),
        logo(once),
        label(allText(atLeast(1)), IMG_TEXT_LABEL),
      ),
    )
  ).score(30),

],
{
  clustering: false,
  scalingSelector: '.img-text, .container:not(.container-image)',
});

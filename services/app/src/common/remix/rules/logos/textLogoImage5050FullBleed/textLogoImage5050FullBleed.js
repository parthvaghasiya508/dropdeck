import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, inOrder, or, textList, cluster, anyElement, text, heading, paragraph, quote, logo, allText } from "../../../match/Matchers";
import { atLeast, between, anyNumber, exactly, once } from "../../../match/expressions/Occurring";
import { imageLogoTextRule } from "../imageLogoTextRule";
import { moveImagesFirst } from "../../../transforms/moveImages";

/**
 * 50 text / 50 logo + image as a stack in any order
 */
export const textLogoImage5050FullBleedRemix = new Remix('textlogoimage-5050-fullbleed', (colorChart) => ({
  '& *': { boxSizing: 'border-box', },
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math': {
    width: '45%',
    textAlign: 'left',
    alignSelf: 'flex-start !important',
  },
  '& .container:not(.container-image)': {
    overflow: 'hidden',
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
  // image
  '& .container-image, & .container-logo': {
    position: 'absolute',
    width: '46% !important',
    top: '50%',
    bottom: '0',
    right: '0',
    margin: '0 !important',
    height: '50% !important',
    borderLeft: '1px solid transparent',
    '& .element': {
      width: '100% !important',
      alignSelf: 'flex-end !important',
      margin: '0 !important',
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
  },
  // image only
  '& .container-image': {
    '&[data-length="2"]': {
      '& .element': {
        position: 'absolute',
        boxSizing: 'border-box',
        width: '50% !important',
        height: '50% !important',
        alignSelf: 'flex-end !important',
        margin: '0 !important',
        '&:nth-of-type(1)': {
          left: '0',
          bottom: '0',
          height: '100% !important',
        },
        '&:nth-of-type(2)': {
          right: '0',
          bottom: '0',
          height: '100% !important',
        },
      },
    },
    '&[data-length="3"]': {
      '& .element': {
        position: 'absolute',
        boxSizing: 'border-box',
        width: '50% !important',
        height: '50% !important',
        alignSelf: 'flex-end !important',
        margin: '0 !important',
        '&:nth-of-type(1)': {
          left: '0',
          bottom: '0',
          height: '100% !important',
        },
        '&:nth-of-type(2)': {
          right: '0',
        },
        '&:nth-of-type(3)': {
          right: '0',
          bottom: '0',
        },
      },
    },
    '&[data-length="4"]': {
      '& .element': {
        position: 'absolute',
        boxSizing: 'border-box',
        width: '50% !important',
        height: '50% !important',
        alignSelf: 'flex-end !important',
        margin: '0 !important',
        '&:nth-of-type(1)': {
          left: '0',
        },
        '&:nth-of-type(2)': {
          right: '0',
        },
        '&:nth-of-type(3)': {
          bottom: '0',
        },
        '&:nth-of-type(4)': {
          right: '0',
          bottom: '0',
        },
      },
    },

  },
  // logo only
  '& .container-logo': {
    width: 'calc(46% - 0.025em) !important',
    top: '0',
    bottom: '50%',
    background: '#fff',
    borderLeft: '0.025em solid rgba(0,0,0,0.075)',
    '& .element': {
      '& .imgWrap': {
        borderRadius: 0,
        padding: '12%',
        objectFit: 'contain !important',
        '& img': {
          objectFit: 'contain !important',
        },

      },
    },
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
}),
imageLogoTextRule().score(55), // standard image/logo/text rule
{
  scalingSelector: '.container:not(.container-image)',

  // We apply a "magnet" transformation to list out all the images first, followed by
  // the rest of the content on the slide. The rule above runs after this transformation.
  transform: moveImagesFirst,

});

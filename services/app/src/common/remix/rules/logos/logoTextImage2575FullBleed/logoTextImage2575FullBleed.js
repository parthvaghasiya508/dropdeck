import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, inOrder, logo, or, allText } from "../../../match/Matchers";
import { atLeast, between, exactly } from "../../../match/expressions/Occurring";
import { imageLogoTextRule } from "../imageLogoTextRule";
import { moveImagesFirst } from "../../../transforms/moveImages";

/**
 * 5050 single logos + text + full bleed image(s)
 */
export const logoTextImage2575FullBleedRemix = new Remix('logotextimage-2575-fullbleed', {
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math': {
    width: '69%',
    textAlign: 'left',
    alignSelf: 'flex-start !important',
  },
  '& .container-image': {
    position: 'absolute',
    width: '25% !important',
    top: '0',
    bottom: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
    '& .element': {
      width: '100% !important',
      alignSelf: 'flex-end !important',
      margin: '0 !important',
      '&:first-child:nth-last-child(2), &:first-child:nth-last-child(2) ~ .element': {
        height: '50%',
      },
      '&:first-child:nth-last-child(3), &:first-child:nth-last-child(3) ~ .element': {
        height: '33.3334%',
      },
      '&:first-child:nth-last-child(4), &:first-child:nth-last-child(4) ~ .element': {
        height: '25%',
      },
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
  },
  '& .container:not(.container-image)': {
    overflow: 'hidden',
  },
  // logos
  '& .container-logo': {
    '& *': { boxSizing: 'border-box', },
    margin: '0.5em 0 1em 0',
    padding: '0',
    width: '45%',
    height: '3.5em',
    '& .element': {
      width: '45%',
      display: 'flex',
      '& .imgWrap img': {
        margin: '0 auto 0 0',
        width: 'auto',
        maxWidth: '100%',
      },
    },
  },
  '& .container-heading-one + .container-logo': {
    margin: '-0.25em 0 1.25em 0',
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
    margin: '0.5em 0 1em 0',
  },
},

imageLogoTextRule().score(60), // standard image/logo/text rule

{
  scalingSelector: '.container:not(.container-image)',

  // We apply a "magnet" transformation to list out all the images first, followed by
  // the rest of the content on the slide. The rule above runs after this transformation.
  transform: moveImagesFirst,

});

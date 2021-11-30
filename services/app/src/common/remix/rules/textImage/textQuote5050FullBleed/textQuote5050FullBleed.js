import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { allText, image, inOrder, label, quote } from "../../../match/Matchers";
import { anyNumber, between, once } from "../../../match/expressions/Occurring";

/**
 * ti8: 50t/50i full bleed image with quote - first image rounded and allied to quote,
 * subsequent images stack in 5050 container
 */
export const textQuote5050FullBleedRemix = new Remix('textquote-5050-fullbleed', {
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code': {
    width: '45%',
    textAlign: 'left',
    alignSelf: 'flex-start !important',
  },
  '& .container-block-quote': {
    '& blockquote': {
      paddingLeft: '0.55em',
      paddingTop: '1em',
    },
    '& p': {
      textAlign: 'center',
    },
  },
  '& .group-images': {
    position: 'absolute',
    width: '46% !important',
    top: '0',
    bottom: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
    '& .container-image': {
      '& .group-images': {
        width: '100% !important',
      },
      '& .element': {
        width: '100% !important',
        alignSelf: 'flex-end !important',
        margin: '0 !important',
        '&:first-child:nth-last-child(2), &:first-child:nth-last-child(2) ~ .element': { height: '50%', },
        '&:first-child:nth-last-child(3), &:first-child:nth-last-child(3) ~ .element': { height: '33.3334%', },
        '&:first-child:nth-last-child(4), &:first-child:nth-last-child(4) ~ .element': { height: '25%', },
        '& .imgWrap img': {
          objectFit: 'cover',
        },
      },
    },
  },
  '& .img-quote': {
    overflow: 'hidden',
    width: '45%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    '& .container': {
      position: 'static',
      width: '100%',
    },

    // image rounded
    '& .container-image': {
      width: '5em',
      height: '5em',
      minHeight: '5em',
      margin: '0 auto 1em auto',
      '& .element': {
        '& .imgWrap img': {
          objectFit: 'cover',
          borderRadius: '50%',
          width: '5em',
          height: '5em',
          minHeight: '5em',
        },
      },
    },

    // Math
    '& .container-math': {
      margin: '0 0 0.5em 0', 
      '& .katex-display': {
        margin: '0', 
        '& > .katex': {
          textAlign: 'center',
        },
      },
    },
    // Code
    '& .container-code': {
      margin: '0.5em 0 1em 0', 
      textAlign: 'left',
    },
  },
  '& .img-quote .container': {
    textAlign: 'center',
  },
},
when(
  label(
    inOrder(
      image(once),
      quote(once),
      allText(anyNumber),
    ), "img-quote"
  ),
  label(image(between(1, 4)), "group-images"),
), {
  scalingSelector: '.img-quote',
});

import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { inOrder, or, paragraph, quote, image, imageLogo, plainText } from "../../../match/Matchers";
import { optional } from "../../../match/expressions/Occurring";

/**
 * Centered quote, additional quotes stack with increased margin. with or without image.
 */
export const quoteSimpleImageRemix = new Remix('quote-simple-img', {
  alignItems: 'center !important',
  '& .container-block-quote': {
    position: 'relative',
    zIndex: '0',
    width: '75%',
    marginTop: '0.5em',
    marginBottom: '0.5em',
    '& blockquote': {
      textAlign: 'center',
      margin: '0 auto',
      '& p': {
        display: 'inline',
        position: 'static',
        textIndent: '0',
        '&:before, &:after': {
          margin: '0 0.085em 0 0',
          position: 'relative',
          fontSize: "unset",
          top: '0',
        },
        '&:after': {
          margin: '0 0 0 0.075em',
        },
      },
    },
  },
  '& .container': {
    overflow: 'hidden',
    '&:not(.container-block-quote)': {
      position: 'relative',
      zIndex: '1',
    },
  },

  '& .container-heading-one, & .container-heading-two': {
    '& h1, & h2': {
      textAlign: 'center',
    },
  },

  '& .container-logo': {
    '& .imgWrap': {
      margin: '0',
      float: 'left',
      width: '7.5em',
      height: '6.5em',
      '& img': {
        borderRadius: '0',
        objectFit: 'contain',
      },
    },
  },
  '& .container.container-image': {
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
      '& .edit-actions': {
        top: 'unset',
        bottom: 'calc(0% + 9px)',
        left: 'calc(50% - 17px)',
        '& button': {
          width: '34px',            
          height: '34px',
          marginRight: '0',
        },
      },
    },
  },

},
when(
  or(
    inOrder(quote(), imageLogo(), plainText(optional)),
    inOrder(quote(), plainText(optional), imageLogo()),
    inOrder(imageLogo(optional), quote(), plainText(optional)),
    inOrder(imageLogo(optional), plainText(optional), quote()),
  )
).score(41), { 
  featured: true,
  scalingSelector: '.container',
});

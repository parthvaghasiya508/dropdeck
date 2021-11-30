import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, inOrder, logo, or, plainText } from "../../../match/Matchers";
import { atLeast, between } from "../../../match/expressions/Occurring";

export const MAX_LOGOS = 28;

/**
 * 5050 text + multiple logos + full bleed image(s)
 */
export const textLogosImage5050FullBleedRemix = new Remix('textlogosimage-5050-fullbleed', {
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code': {
    width: '45%',
    textAlign: 'left',
    alignSelf: 'flex-start !important',
  },
  '& .container-image': {
    position: 'absolute',
    width: '46% !important',
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
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0',
    padding: '0',
    width: '45%',
    height: 'auto',
    minHeight: '40%',
    '& .element': {
      margin: '0',
      padding: '0',
      textAlign: 'center',
      flex: '0 0 75%',
      height: 'auto',
      display: 'block',
      '& .imgWrap img': {
        objectFit: 'contain',
        padding: '0',
        width: '85%',
        margin: '0.65em 0',
      },
    },

    //  2 logos
    '&[data-length="2"]': {
      '& .element': {
        flex: '0 0 50%',
        padding: '0% 5% 0% 0%', // move padding to right so images align left with text
      },
    },

    //  3 logos
    '&[data-length="3"], &[data-length="5"], &[data-length="6"], &[data-length="8"], &[data-length="9"]': {
      '& .element': {
        flex: '0 0 33%',
        padding: '0% 5% 0% 0%', // move padding to right so images align left with text
      },
    },

    //  4 logos
    '&[data-length="4"]': {
      '& .element': {
        flex: '0 0 45%',
        padding: '1% 9% 1% 0%', // move padding to right so images align left with text
      },
    },

    //  7 - 19
    '&[data-length="7"], &[data-length="10"], &[data-length="11"], &[data-length="12"], &[data-length="13"], &[data-length="14"], &[data-length="15"], &[data-length="16"], &[data-length="17"], &[data-length="18"], &[data-length="19"]': {
      '& .element': {
        flex: '0 0 25%',
        padding: '0% 3.5%',
      },
    },

    //  20 - 28
    '&[data-length="20"], &[data-length="21"], &[data-length="22"], &[data-length="23"], &[data-length="24"], &[data-length="25"], &[data-length="26"], &[data-length="27"], &[data-length="28"]': {
      '& .element': {
        flex: '0 0 20%',
        padding: '0% 3.5%',
      },
    },

  },
},
when(
  plainText(atLeast(1)),
  or(
    inOrder(
      logo(between(1, MAX_LOGOS)),
      image(between(1, 4)),
    ),
    inOrder(
      image(between(1, 4)),
      logo(between(1, MAX_LOGOS)),
    )
  )
),

{
  scalingSelector: '.container:not(.container-image)',
});

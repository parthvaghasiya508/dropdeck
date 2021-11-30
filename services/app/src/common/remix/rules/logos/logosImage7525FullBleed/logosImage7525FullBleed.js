// l3b: 5050 text + logos + full bleed image(s) - (No text)
// --------------------------------------------------------
import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, inOrder, logo, or } from "../../../match/Matchers";
import { between } from "../../../match/expressions/Occurring";

export const MAX_LOGOS = 28;

export const logosImage7525FullBleedRemix = new Remix('logosimage-7525-fullbleed', {
  textAlign: 'left',
  alignItems: 'flex-start',
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
  // logos
  '& .container-logo': {
    '& *': { boxSizing: 'border-box', },
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0',
    padding: '0',
    width: '67%',
    height: 'auto',
    minHeight: '40%',
    '& .element': {
      margin: '0',
      padding: '0',
      textAlign: 'center',
      flex: '0 0 60%',
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
        flex: '0 0 35%',
        padding: '0% 2.5%', // move padding to right so images align left with text
      },
    },

    //  3 logos
    '&[data-length="3"], &[data-length="5"], &[data-length="6"]': {
      '& .element': {
        flex: '0 0 33%',
        padding: '0% 2.5%', // move padding to right so images align left with text
      },
    },

    //  4 logos
    '&[data-length="4"]': {
      '& .element': {
        flex: '0 0 25%',
        padding: '0% 3%', // move padding to right so images align left with text
      },
    },

    //  5 - 28
    '&[data-length="7"], &[data-length="8"], &[data-length="9"], &[data-length="10"], &[data-length="11"], &[data-length="12"], &[data-length="13"], &[data-length="14"], &[data-length="15"], &[data-length="16"], &[data-length="17"], &[data-length="18"], &[data-length="19"], &[data-length="20"], &[data-length="21"], &[data-length="22"], &[data-length="23"], &[data-length="24"], &[data-length="25"], &[data-length="26"], &[data-length="27"], &[data-length="28"]': {
      '& .element': {
        flex: '0 0 20%',
        padding: '0% 3.75%', // move padding to right so images align left with text
      },
    },
  },
},
when(
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
));

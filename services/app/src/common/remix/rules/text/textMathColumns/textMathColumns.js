// rt4: 50t/50c text + code columns
// ---------------------------------
import { Remix } from "../../../Remix";
import { allTextNoMath, logo, math } from "../../../match/Matchers";
import { when } from "../../../match/RemixRule";
import { anyNumber, atLeast, between, exactly } from "../../../match/expressions/Occurring";

/**
 * 50t/50c text + code columns
 */
export const textMathColumnsRemix = new Remix('textmath-5050-columns',
  {
    textAlign: 'left',
    alignItems: 'flex-start',
    '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-logo, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code': {
      width: '41%',
      textAlign: 'left',
      alignSelf: 'flex-start !important',
    },

    '& .container': {
      overflow: 'hidden',
    },

    // logos
    '& .container-logo': {
      '& *': { boxSizing: 'border-box', },
      margin: '0 0 1.5em 0',
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
    // Code
    '& .container-code': {
      margin: '0.5em 0',
      '& code': {
        margin: '0',
        background: 'transparent',
      },
    },
    // math
    '& .container-math': {
      boxSizing: 'border-box',
      borderRadius: 0,
      position: 'absolute',
      width: '50% !important',
      top: '0',
      bottom: '0',
      right: '0',
      margin: '0 !important',
      display: 'flex',
      alignItems: 'center',
      padding: '0 4.5%',
      background: 'rgba(0,0,0,0.05)',
      '& .katex-display': {
        margin: '0 auto',
        '& > .katex': {
          margin: '0 auto',
          textAlign: 'center !important',
        },
      },
      // 2 math block stack
      '&[data-length="2"] .element': {
        height: '50%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        background: 'rgba(0,0,0,0.1)',
        '&:last-child': {
          top: '50%',
          background: 'rgba(0,0,0,0.05)',
        },
      },
      // 3 math block stack
      '&[data-length="3"] .element': {
        height: '33.3334%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        background: 'rgba(0,0,0,0.05)',
        '&:nth-child(2)': {
          top: '33.3334%',
          background: 'rgba(0,0,0,0.1)',
        },
        '&:last-child': {
          top: '66.6667%',
          background: 'rgba(0,0,0,0.05)',
        },
      },
      // 4 math block stack
      '&[data-length="4"] .element': {
        height: '25%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        background: 'rgba(0,0,0,0.05)',
        '&:nth-child(2)': {
          top: '25%',
          background: 'rgba(0,0,0,0.1)',
        },
        '&:nth-child(3)': {
          top: '50%',
          background: 'rgba(0,0,0,0.05)',
        },
        '&:last-child': {
          top: '75%',
          background: 'rgba(0,0,0,0.1)',
        },
      },
      // 5 math block stack
      '&[data-length="5"] .element': {
        height: '20%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        left: '0',
        background: 'rgba(0,0,0,0.05)',
        '&:nth-child(2)': {
          top: '20%',
          background: 'rgba(0,0,0,0.1)',
        },
        '&:nth-child(3)': {
          top: '40%',
          background: 'rgba(0,0,0,0.05)',
        },
        '&:nth-child(4)': {
          top: '60%',
          background: 'rgba(0,0,0,0.1)',
        },
        '&:last-child': {
          top: '80%',
          background: 'rgba(0,0,0,0.05)',
        },
      },

    },
  },[

    when(
      allTextNoMath(atLeast(1)),
      math(between(1,5)),
    ).score(10),

    when(
      math(between(1,5)),
      allTextNoMath(atLeast(1)),
    ).score(10),

    // this will apply even if code does not appear last
    when(
      allTextNoMath(anyNumber),
      math(between(1,5)),
      allTextNoMath(atLeast(1)),
    ).score(10),

    when(
      logo(exactly(1)),
      allTextNoMath(atLeast(1)),
      math(between(1,5)),
    ).score(50),

    when(
      allTextNoMath(atLeast(1)),
      logo(exactly(1)),
      allTextNoMath(anyNumber),
      math(between(1,5)),
    ).score(50),

  ], {
    scalingSelector: ".container:not(.container-logo)"
  });

// rt4: 50t/50c text + code columns
// ---------------------------------
import { Remix } from "../../../Remix";
import { code, text, logo, allTextNoCode } from "../../../match/Matchers";
import { when } from "../../../match/RemixRule";
import { atLeast, once, exactly, anyNumber, between } from "../../../match/expressions/Occurring";

/**
 * 50t/50c text + code columns
 */
export const textCodeColumnsRemix = new Remix('textcode-5050-columns',
  {
    textAlign: 'left',
    alignItems: 'flex-start',
    '& .deck-logo-container:before': {
      background: '#fff',
    },
    '& .container': {
      overflow: 'hidden',
    },
    '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-logo, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code': {
      width: '41%',
      textAlign: 'left',
      alignSelf: 'flex-start !important',
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
    // Math
    '& .container-math': {
      margin: '0 0 0.5em 0',
      '& .katex-display': {
        margin: '0',
      },
    },
    // Code
    '& .container-code': {
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
      padding: '4.5% 4.5%',
      '& code': {
        margin: '0',
        background: 'transparent',
      },
      // 2 code block stack
      '&[data-length="2"]': {
        '& .element': {
          position: 'absolute',
          top: '0',
          left: '0',
          height: '50%',
          padding: '0 9%',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          '& code': {
            width: '100%',
            boxSizing: 'border-box',
          },
        },
        '& .element:last-child': {
          top: '50%',
          background: 'rgba(255,255,255,0.05)',
        },
      },
      // 3 code block stack
      '&[data-length="3"]': {
        '& .element': {
          position: 'absolute',
          top: '0',
          left: '0',
          height: '33.3334%',
          padding: '0 9%',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          '& code': {
            width: '100%',
            boxSizing: 'border-box',
          },
        },
        '& .element:nth-child(2)': {
          top: '33.3334%',
          background: 'rgba(255,255,255,0.05)',
        },
        '& .element:last-child': {
          top: '66.6667%',
        },
      },

    },
    // Code overflow when slide scaling
    '&.scaling-1, &.scaling-2, &.scaling-3, &.scaling-4, &.scaling-5, &.scaling-6, &.scaling-7, &.scaling-8, &.scaling-9, &.scaling-10, &.scaling-11, &.scaling-12, &.scaling-13, &.scaling-14, &.scaling-15, &.scaling-16, &.scaling-17, &.scaling-18, &.scaling-19, &.scaling-20, &.scaling-max': {
      '& .container-code': {
        '& element': {
          boxSizing: 'border-box',
          position: 'relative',
        },
        '& .codeBlock code': {
          whiteSpace: 'pre !important',
        },
        '&:before': {
          position: 'absolute',
          content: '""',
          top: '1em',
          bottom: '1em',
          right: '9%',
          width: '3%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0), #212121)',
          zIndex: '2',
        },
      },
    },

  },[

    when(
      allTextNoCode(atLeast(1)),
      code(between(1,3)),
    ).score(10),

    when(
      code(between(1,3)),
      allTextNoCode(atLeast(1)),
    ).score(10),

    // this will apply even if code does not appear last
    when(
      allTextNoCode(anyNumber),
      code(between(1,3)),
      allTextNoCode(atLeast(1)),
    ).score(10),

    when(
      logo(exactly(1)),
      allTextNoCode(atLeast(1)),
      code(between(1,3)),
    ).score(50),

    when(
      allTextNoCode(atLeast(1)),
      logo(exactly(1)),
      allTextNoCode(anyNumber),
      code(between(1,3)),
    ).score(50),

  ], {
    scalingSelector: ".container:not(.container-logo)"
  });

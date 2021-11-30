// rt6: 50t/50c text + code laid out in 2 rows
// -------------------------------------------
import { Remix } from "../../../Remix";
import { code, inOrder, label, or, allTextNoCode } from "../../../match/Matchers";
import { atLeast, once, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

export const textCodeRowsRemix = new Remix('textcode-5050-rows',
  {
    padding: '0',
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'space-between !important',
    '& .deck-logo-container:before': {
      background: '#fff',
    },
    // Text
    '& .text-wrap-before, & .text-wrap-after': {
      boxSizing: 'border-box',
      width: '100%',
      padding: '4% 6%',
      overflow: 'hidden',
      '& .container': {
        width: '100%',
        '&:first-of-type': {
          '& .element': { 
            '& h1, & h2, & p': { 
              paddingTop: '0.25em',
            },
          },
        },
        '&:last-of-type': {
          '& .element': { 
            '& h1, & h2, & p': { 
              paddingBottom: '0.25em',
              marginBottom: '0', 
            },
          },
        },
      },
      '& h1': { marginBottom: '0.25em', },
    },
    // Code
    '& .container-code': {
      overflow: 'hidden',
      boxSizing: 'border-box',
      borderRadius: 0,
      margin: '0 !important',
      flex: 'auto',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
      minHeight: '40%',
      padding: '4% 6%',
      '& code': {
        margin: '0',
        background: 'transparent',
        padding: '0',
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
          right: '6%',
          width: '2.5%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0), #212121)',
          zIndex: '2',
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

  },[

    when(
      code(once),
    ).score(10),

    when(
      or(
        inOrder(
          label(allTextNoCode(atLeast(1)), "text-wrap-before"),
          code(),
        ),
        inOrder(
          code(),
          label(allTextNoCode(atLeast(1)), "text-wrap-after"),
        ),
      ),
    ),

    when(
      inOrder(
        code(),
        label(allTextNoCode(exactly(1)), "text-wrap-after"),
      ),
    ).score(50),

  ], {
    scalingSelector: ".text-wrap-before, .text-wrap-after, .container-code"
  });

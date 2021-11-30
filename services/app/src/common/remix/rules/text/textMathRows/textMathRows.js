// rt6: 50t/50c text + code laid out in 2 rows
// -------------------------------------------
import { Remix } from "../../../Remix";
import { math, inOrder, label, or, allTextNoMath } from "../../../match/Matchers";
import { atLeast, once, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

export const textMathRowsRemix = new Remix('textmath-5050-rows',
  {
    padding: '0',
    textAlign: 'left',
    alignItems: 'flex-start',
    justifyContent: 'space-between !important',
    '& .text-wrap-before, & .text-wrap-after': {
      boxSizing: 'border-box',
      width: '100%',
      padding: '6% 9%',
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
    // math
    '& .container-math': {
      boxSizing: 'border-box',
      borderRadius: 0,
      margin: '0 !important',
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
      padding: '6% 9%',
      background: 'rgba(0,0,0,0.05)',
      minHeight: '33%',
      '& .katex-display': {
        fontSize: '180%',
        margin: '0 auto',
        '& > .katex': {
          margin: '0 auto',
          textAlign: 'center !important', 
        },
      },
    },

  },[

    when(
      math(once),
    ).score(10),

    when(
      or(
        inOrder(
          label(allTextNoMath(atLeast(1)), "text-wrap-before"),
          math(),
        ),
        inOrder(
          math(),
          label(allTextNoMath(atLeast(1)), "text-wrap-after"),
        ),
      ),
    ),

    when(
      inOrder(
        math(),
        label(allTextNoMath(exactly(1)), "text-wrap-after"),
      ),
    ).score(50),

  ], {
    scalingSelector: ".text-wrap-before, .text-wrap-after, .container-code"
  });

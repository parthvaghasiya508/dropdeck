import { Remix } from "../../../Remix";
import { atLeast, anyNumber, once } from "../../../match/expressions/Occurring";
import { chart, inOrder, or, allText, label, allTextLogo } from "../../../match/Matchers";
import { when } from "../../../match/RemixRule";

// ch1: 50t/50i
export const textChartColumnRemix = new Remix('text-chart-5050',
  {
    '& .container-chart': {
      position: 'absolute',
      width: '46% !important',
      top: '0',
      right: '0',
      bottom: '0',
      margin: '0 !important',
      height: 'auto !important',
      display: 'flex',
      justifyContent: 'center',
      padding: '0em',
      boxSizing: 'border-box',
      '& .element': {
        boxSizing: 'border-box',
        display: 'flex',
        '& > div': {
          boxSizing: 'border-box',
          maxHeight: '18em',
          margin: 'auto 0',
        },
      },
    },
    '& .container-logo': {
      margin: '0.5em 0',
      padding: '0',
      '& .imgWrap': {
        margin: '0 auto 1.5em 0',
        maxWidth: '40%',
        maxHeight: '8em',
        boxSizing: 'border-box',
      },
    },
    '& .section-text': {
      overflow: 'hidden',
      width: '45%',
      '& .container': {
        width: '100%',
        textAlign: 'left',
      },
      '& .container-math': {
        margin: '0 0 0.5em 0',
        '& .katex-display': {
          margin: '0',
        },
      },
      '& .container-code': {
        margin: '0.5em 0 1em 0',
      },
    },

  },[

    when(
      label(allTextLogo(atLeast(1)), "section-text"),
      chart(once),
    ),

    when(
      chart(once),
      label(allTextLogo(atLeast(1)), "section-text"),
    ),

  ],{
    scalingSelector: '.section-text, .container',
  });

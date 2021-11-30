//  ----------------------------------------------------------------------------------------------
import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { allTextLogo, chart, inOrder, label, table } from "../../../match/Matchers";
import { anyNumber, atLeast, between, once } from "../../../match/expressions/Occurring";

export const tableChart2575Remix = new Remix('tablechart-2575', {
  padding: '9% 4.5%',
  '& .container-table, & .container-chart': {
    position: 'absolute',
    width: '68% !important',
    top: '0',
    right: '0',
    bottom: '0',
    margin: '0 !important',
    height: '100% !important',
    display: 'flex',
    justifyContent: 'center',
    padding: '2em',
    boxSizing: 'border-box',
    background: 'rgba(0,0,0,0.025)',
  },
  // Table
  '& .container-table': {
    boxSizing: 'border-box',
    alignItems: 'center',
    '& .element': {
      overflow: 'hidden',
      overflowX: 'scroll',
      '& table': {
        margin: '0',
        overflow: 'hidden',
        '& th, & td': {
          overflowWrap: 'break-word',
        },
      },
    },
  },
  // 2/3 Tables
  '& .sequence-table': {
    flexDirection: 'column',
    '& .element': {
      padding: '1em 0',
      margin: '0',
      height: 'auto',
      minHeight: '10%',
    },
    '&[data-length="2"]': {
      '& .element': {
        maxHeight: '45%',
      },
    },
    '&[data-length="3"]': {
      '& .element': {
        maxHeight: '33%',
      },
    },
  },
  // Chart
  '& .container-chart': {
    '& .element': {
      boxSizing: 'border-box',
      display: 'flex',
      '& > div': {
        boxSizing: 'border-box',
        maxHeight: '18em',
        margin: 'auto 0.25em',
      },
    },
  },
  // 2/3 Charts
  '& .sequence-chart': {
    flexDirection: 'column',
    justifyContent: 'space-around',
    '& .element': {
      padding: '1em 0',
      margin: '0',
      height: '10em',
      minHeight: '10em',
      maxHeight: '10em',
      '& > div': {
        margin: '0',
        height: 'unset',
        minHeight: 'unset',
        maxHeight: 'unset',
      },
    },
    '&[data-length="2"]': {
      '& .element': {
        maxHeight: '45%',
      },
    },
    '&[data-length="3"]': {
      '& .element': {
        maxHeight: '33%',
      },
    },
  },
  // 1 x Table 1 x Chart
  '& .section-group-mixed': {
    width: '68%',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    '& .container': {
      position: 'absolute',
      width: '100% !important',
      top: '0',
      right: '0',
      bottom: '0',
      margin: '0 !important',
      height: '50% !important',
      display: 'flex',
      justifyContent: 'center',
      padding: '2em',
      boxSizing: 'border-box',
      background: 'rgba(0,0,0,0.025)',
      '&:first-of-type': {
        top: '0 !important',
        background: 'rgba(0,0,0,0.025)',
      },
      '&:last-of-type': {
        top: '50% !important',
      },
    },
    '& .container-table': {
      overflow: 'hidden',
    },
  },
  // Logo
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
  // Text
  '& .section-text-before, & .section-text-after': {
    overflow: 'hidden',
    width: '25%',
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
    '& .container-paragraph + :not(.container-paragrah)': {
      marginTop: '1.5em',
    },
  },

},[

  // 1-3 tables, in sequence
  when(
    label(allTextLogo(atLeast(1)), "section-text-before"),
    table(between(1,3)),
    label(allTextLogo(anyNumber), "section-text-after"),
  ).score(25),

  when(
    label(allTextLogo(anyNumber), "section-text-before"),
    table(between(1,3)),
    label(allTextLogo(atLeast(1)), "section-text-after"),
  ).score(25),

  // 1-3 charts, in sequence
  when(
    label(allTextLogo(atLeast(1)), "section-text-before"),
    chart(between(1,3)),
    label(allTextLogo(anyNumber), "section-text-after"),
  ).score(25),

  when(
    label(allTextLogo(anyNumber), "section-text-before"),
    chart(between(1,3)),
    label(allTextLogo(atLeast(1)), "section-text-after"),
  ).score(25),

  // 1 table 1 chart
  when(
    label(allTextLogo(atLeast(1)), "section-text-before"),
    label(
      inOrder(
        table(once),
        chart(once),
      ),
      "section-group-mixed"
    ),
    label(allTextLogo(anyNumber), "section-text-after"),
  ).score(25),

  when(
    label(allTextLogo(anyNumber), "section-text-before"),
    label(
      inOrder(
        table(once),
        chart(once),
      ),
      "section-group-mixed"
    ),
    label(allTextLogo(atLeast(1)), "section-text-after"),
  ).score(25),

  // 1 chart 1 table
  when(
    label(allTextLogo(atLeast(1)), "section-text-before"),
    label(
      inOrder(
        chart(once),
        table(once),
      ),
      "section-group-mixed"
    ),
    label(allTextLogo(anyNumber), "section-text-after"),
  ).score(25),

  when(
    label(allTextLogo(anyNumber), "section-text-before"),
    label(
      inOrder(
        chart(once),
        table(once),
      ),
      "section-group-mixed"
    ),
    label(allTextLogo(atLeast(1)), "section-text-after"),
  ).score(25),

],{
  clustering: false,
  scalingSelector: '.section-text-before, .section-text-after, .container, .sequence-table > .element, .section-group-mixed > .container-table',
});

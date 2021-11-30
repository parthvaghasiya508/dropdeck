//  ----------------------------------------------------------------------------------------------
import { Remix } from "../../../Remix";
import { Animations } from "../../../effects/Animations";
import { when } from "../../../match/RemixRule";
import { tableChart, table, chart, plainText, label, logo } from "../../../match/Matchers";
import { anyNumber, once, atMost, between, exactly } from "../../../match/expressions/Occurring";

export const tableChartDefaultRemix = new Remix('tablechart-default', {
  '& .container': {
    width: '100%',
  },
  // Charts
  '& .container-chart': {
    margin: '0.5em 0 0 0',
    padding: '0.5em 0 0 0',
    '& .element': {
      boxSizing: 'border-box',
      display: 'flex',
      '& > div': {
        boxSizing: 'border-box',
        maxHeight: '16em',
        margin: 'auto 0',
      },
    },
  },
  // Charts in sequence
  '& .sequence-chart': {
    flexDirection: 'row',
    '&[data-length="2"]': {
      '& .element': {
        margin: '0 1em',
        width: '50%',
      },      
    },
    '&[data-length="3"]': {
      '& .element': {
        margin: '0 1em',
        width: '33%',
        '& > div': {
          maxHeight: '12em',
        },
      },      
    },
  },

  '& .container-table': {
    margin: '0.5em 0',
    padding: '0',
  },
  // Tables in sequence
  '& .sequence-table': {
    flexDirection: 'column',
    '& .element': {
      margin: '1em 0',
    }, 
  },
  // Scaling
  '& .container:not(.container-table), & .container:not(.container-chart), & .container:not(.container-logo)': {
    overflow: 'hidden',
  },
  '& .container-logo': {
    margin: '0.5em 0',
    padding: '0',
    '& .imgWrap': {
      margin: '0 auto 1em auto',
      maxWidth: '40%',
      maxHeight: '8em',
      boxSizing: 'border-box',
    },
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    width: '100%',
    textAlign: 'center',
    '& H1': {
      margin: '0 0 0.65em 0',
    },
    '& H2': {
      margin: '0 0 0.5em 0',
    },
    '& P': {
      margin: '0 0 0.5em 0',
    },
  },
  // Text
  '& .group-text-before, & .group-text-after, & .group-text-between': {
    width: '100%',
    margin: '0 auto 1em auto',
    fontSize: '85%',
    '& h1, & h2, & p': {
      margin: '0 !important',
      lineHeight: '1.4',
    },
  },
  '& .group-text-after': {
    margin: '1em auto 0 auto',
  },
  '& .group-text-between': {
    margin: '1.5em auto 1em auto',
  },
},[

  // Between 1 - 3 tables / charts, in sequence
  when(
    label(plainText(anyNumber), "group-text-before"),
    table(between(1,3)),
    label(plainText(anyNumber), "group-text-after"),
  ).score(30),

  when(
    label(plainText(anyNumber), "group-text-before"),
    chart(between(1,3)),
    label(plainText(anyNumber), "group-text-after"),
  ).score(30),

  // Between 1 and 2 tables / charts, not in sequence
  when(
    label(plainText(anyNumber), "group-text-before"),
    table(exactly(1)),
    label(plainText(anyNumber), "group-text-between"),
    table(atMost(1)),
    label(plainText(anyNumber), "group-text-after"),
  ).score(30),

  when(
    label(plainText(anyNumber), "group-text-before"),
    chart(exactly(1)),
    label(plainText(anyNumber), "group-text-between"),
    chart(atMost(1)),
    label(plainText(anyNumber), "group-text-after"),
  ).score(30),

  // one table / chart, with logo
  when(
    logo(atMost(1)),
    label(plainText(anyNumber), "group-text-before"),
    tableChart(once),
    label(plainText(anyNumber), "group-text-after"),
  ).score(30),

  when(
    label(plainText(anyNumber), "group-text-before"),
    logo(atMost(1)),
    tableChart(once),
    label(plainText(anyNumber), "group-text-after"),
  ).score(30),

  when(
    label(plainText(anyNumber), "group-text-before"),
    tableChart(once),
    logo(atMost(1)),
    label(plainText(anyNumber), "group-text-after"),
  ).score(30),

  when(
    label(plainText(anyNumber), "group-text-before"),
    tableChart(once),
    label(plainText(anyNumber), "group-text-after"),
    logo(atMost(1)),
  ).score(30),

],{
  clustering: false,
  scalingSelector: ".container:not(.container-logo):not(.container-chart)"
});

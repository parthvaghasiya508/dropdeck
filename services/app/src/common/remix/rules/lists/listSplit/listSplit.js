import { Remix } from "../../../Remix";
import { list, text, plainText, label } from "../../../match/Matchers";
import { anyNumber, once, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Split list into two columns when data-count = 6.
 */
export const listSplitRemix = new Remix('list-split', {
  '& .container': {
    overflow: 'hidden',
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
  },

  '& .container-bulleted-list, & .container-numbered-list': {
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    '& ul, & ol': {
      columnCount: '2',
      columnFill: 'auto',
      '& li': {
        display: 'inline-block',
        width: '100%',
        '-webkit-column-break-inside': 'avoid',
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
        margin: '0 !important',
        padding: '0 0 0 1.5em !important',
        '&:before': {
          padding: '0.3em 0',
        },
        '& p': {
          textAlign: 'left',
          padding: '0.3em 0',
        },
      },
      '& ul, & ol': {
        columnCount: '1',
      },
    },

  },

  // GROUP TEXT
  '& .group-text-after, & .group-text-before': {
    fontSize: '95%',
    marginTop: '0.5em',
    width: '100%',
    textAlign: 'left',
    '& .container': {
      width: '100%',
      textAlign: 'left',
      '& *': {
        width: '100%',
        textAlign: 'left',
      },
    },
    '& h1': { marginBottom: '0.25em', },
  },
  '& .group-text-before': {
    marginTop: '0',
    marginBottom: '0.5em',
  },

},[

  when(
    label(plainText(anyNumber), "group-text-before"),
    list(exactly(1)),
    label(plainText(anyNumber), "group-text-after"),
  ).score(1),

], {
  scalingSelector: '.container',
});

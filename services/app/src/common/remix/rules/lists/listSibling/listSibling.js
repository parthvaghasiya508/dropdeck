//  rl1:   Split single list(s) into two columns.
import { Remix } from "../../../Remix";
import { list, numberedList, bulletedList, label, plainText, or } from "../../../match/Matchers";
import { atLeast, anyNumber } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Display up to 3 sibling lists across columns.
 */
export const listSiblingRemix = new Remix('list-sibling-sidebyside', {
  '& .container': {
    overflow: 'hidden',
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'left', },
    '& .container': { width: '100%', },
  },

  // Lists
  '& .container-bulleted-list, & .container-numbered-list': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    '& ul, & ol': {
      margin: '0',
      padding: '0 0.75em',
      boxSizing: 'border-box',
      '& li': {
        width: 'auto',
        '&:before': {
          lineHeight: '1.1',
        },
        '& p': {
          textAlign: 'left',
        },
        '&:last-of-type': {
          marginBottom: '0 !important',
          '& p': {
            marginBottom: '0',
          },
        },
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
    or(
      numberedList(atLeast(2)),
      bulletedList(atLeast(2))
    ),
    label(plainText(anyNumber), "group-text-after"),
  ).score(1),

], {
  scalingSelector: '.container',
});

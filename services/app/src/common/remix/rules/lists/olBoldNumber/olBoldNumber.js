//  rl1:   Split single list(s) into two columns.
import { Remix } from "../../../Remix";
import { label, numberedList, plainText } from "../../../match/Matchers";
import { anyNumber } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Big number list - fits up to 5 comfortably, looks best with longer bullets.
 */
export const olBoldNumberRemix = new Remix('ol-boldnumber', {
  alignItems: 'flex-start !important',
  '& .container': {
    textAlign: 'left',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    width: '100%',
    textAlign: 'left',
  },
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 0 1em 0',
    '& h1, & h2': { margin: '0 0 0.166em 0', },
    '& p': { margin: '0 0 0.322em 0', },
    '& .container:last-child *:last-child': { margin: '0', },
  },
  '& .group-text-after': {
    margin: '1em 0 0 0',
  },
  '& .container-numbered-list': {
    overflow: 'hidden',
    textAlign: 'left',
    padding: '0',
    '& ol': {
      listStyle: 'none',
      counterReset: 'list-counter',
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0',
      padding: '0',
      borderBottom: '0.03em solid',
      '& li': {
        counterIncrement: 'list-counter',
        display: 'flex',
        width: '100%',
        margin: '0',
        padding: '0.25em 0',
        borderTop: '0.03em solid',
        alignItems: 'center',
        '& p': {
          fontSize: '1.1em', //
        },
        '&:before': {
          fontSize: '1.1em', //
          content: '"0" counter(list-counter)',
          fontWeight: '500',
          margin: '0',
          minWidth: '1.6em',
        },
        '& ol': {
          width: '100%',
          border: '0',
          '& li': {
            padding: '0.085em 0',
            border: '0',
            alignItems: 'center',
            '&:before': {
              content: 'counters(list-counter,".") ',
              fontWeight: '500',
              margin: '0 2.5% 0 0',
            },
          },
        },
      },
    },
  },
  '& .container-numbered-list + .container-heading-one h1, & .container-numbered-list + .container-heading-two h2': {
    margin: '1em 0 0 0',
  },
},[
  when(
    label(plainText(anyNumber), "group-text-before"),
    numberedList(),
    label(plainText(anyNumber), "group-text-after"),
  ).score(2.5),
], {
  featured: true,
  scalingSelector: '.container-numbered-list',

});

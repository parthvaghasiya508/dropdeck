//  rl1:   Split single list(s) into two columns.
import { Remix } from "../../../Remix";
import { bulletedList, label, logo, numberedList, or, plainText } from "../../../match/Matchers";
import { anyNumber, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Big number list - fits up to 5 comfortably, looks best with longer bullets.
 */
export const listShortformRemix = new Remix('list-shortform', {
  alignItems: 'flex-start !important',
  justifyContent: 'flex-start !important',
  '& .container': {
    textAlign: 'left',
    overflow: 'hidden',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    width: '100%',
    textAlign: 'left',
  },
  // Text
  '& .group-text-before, & .group-text-after': {
    width: '100%',
    margin: '0 0 1.5em 0',
    fontSize: '140%',
    '& h1': { margin: '0 0 0.166em 0', },
    '& h2': { margin: '0 0 0.166em 0', },
    '& p': { margin: '0.5em 0', linrHeight: '1.2', },
    '& .container:last-child *:last-child': { marginBottom: '0', },
  },
  '& .group-text-after': { margin: '1em 0 0 0', },
  // List
  '& .container-bulleted-list, & .container-numbered-list': {
    textAlign: 'left',
    padding: '0',
    '& ul, & ol': {
      fontSize: '1.5em !important',
      '& li': {
        '&:before': {
          lineHeight: '1.1',
        },
        '& ul, & ol': {
          width: '100%',
          '& li': {
            padding: '0.085em 0',
            border: '0',
            alignItems: 'center',
            fontSize: '0.85em',
            '&:before': {
              content: 'counters(list-counter,".") ',
              fontWeight: '500',
              margin: '0 2.5% 0 0',
              fontSize: '1em',
            },
          },
        },
      },
    },
    '& ol': {
      counterReset: 'list-counter !important',
      '& li': {
        counterIncrement: 'list-counter !important',
        '&:before': {
          content: 'counter(list-counter)"." !important',
          minWidth: '1.6em !important',
        },
        '& ol': {
          padding: '0.5em 0 0.5em 1em',
          '& li:before': {
            content: 'counters(list-counter,".") !important',
            lineHeight: '1.25',
            fontSize: '1.5em !important',
          },
        },
      },
    },

  },
  '& .container-bulleted-list + .container-heading-one h1, & .container-bulleted-list + .container-heading-two h2': {
    margin: '1em 0 0 0',
  },
  // Logo
  '& .container-logo': {
    '& *': { boxSizing: 'border-box', },
    margin: '0 auto 1em 0',
    padding: '0',
    width: '50%',
    height: '4.5em',
    '& .element': {
      width: '45%',
      display: 'flex',
      margin: '0 auto 0 0',
      '& .imgWrap img': {
        margin: '0 auto 0 0',
        width: 'auto',
        maxWidth: '100%',
      },
    },
  },
},[

  when(
    label(plainText(anyNumber), "group-text-before"),
    or(bulletedList(), numberedList()),
    label(plainText(anyNumber), "group-text-after"),
  ).score(10),

  when(
    logo(exactly(1)),
    label(plainText(anyNumber), "group-text-before"),
    or(bulletedList(), numberedList()),
    label(plainText(anyNumber), "group-text-after"),
  ).score(10),

], {
  featured: true,
  deprecated: true,
  scalingSelector: '.container',
});

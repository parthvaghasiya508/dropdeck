//  rl1:   Split single list(s) into two columns.
import { Remix } from "../../../Remix";
import { label, list, plainText, } from "../../../match/Matchers";
import { atLeast, anyNumber, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Centered list that builds in both directions. Text left list right with border.
 */
export const textListCenteredRemix = new Remix('textlist-centered', {
  flexDirection: 'row',
  alignItems: 'center !important',
  justifyContent: 'space-between !important',

  '& .group-text': {
    overflow: 'hidden', 
    maxHeight: '100%',
    width: '45%',
    textAlign: 'right',
    '& .container': {
      textAlign: 'right',
      '& H1, & H2, & p': {
        textAlign: 'right',
        margin: '0',
        padding: '0.25em',
      },
    },
  },

  '& .group-list': {
    overflow: 'hidden',
    width: '45%',
    maxHeight: '100%',
    '& .container-bulleted-list, & .container-numbered-list': {
      '& ol, & ul': {
        padding: '0.25em 0',
        '& li': {
          '&:before': {
            lineHeight: '1.1',
          },
          '&:last-of-type': {
            marginBottom: '0 !important',
          },
        },
      },
    },
  },

},[

  when(
    label(plainText(atLeast(1)), "group-text"),
    label(list(exactly(1)), "group-list"),
  ).score(3),

], {
  deprecated: true,
  scalingSelector: '.group-text, .group-list',
});

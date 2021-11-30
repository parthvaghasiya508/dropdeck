import { Remix } from "../../../Remix";
import { list, plainText, label } from "../../../match/Matchers";
import { anyNumber, atLeast, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Builds from bottom. list fills 1-6, 7 empty as gutter, then text fill units 8-12.
 */
export const listTextUpwardRemix = new Remix('listtext-6u6u-upward', {

  flexDirection: 'row-reverse',
  alignItems: 'center !important',
  justifyContent: 'space-between !important',

  // List Container
  '& .group-list': {
    overflow: 'hidden',
    width: '51%',
    height: '100%',
    maxHeight: '100%',
    padding: '0.25em',
    display: 'flex',
    '& .container-bulleted-list, & .container-numbered-list': {
      marginTop: 'auto',
      '& ul, & ol': {
        width: '100%',
        marginBottom: '0',
        '& li': {
          width: 'auto',
          '&:before': {
            // lineHeight: '1.1',
          },
          '&:last-of-type': {
            width: 'auto',
            marginBottom: '0 !important',
            '& p': {
              marginBottom: '0',
            },
          },
        },
      },
    },
  },

  '& .group-text': {
    overflow: 'hidden', 
    width: '46%',
    textAlign: 'right',
    maxHeight: '100%',
    padding: '0.25em',
    marginTop: 'auto',
    '& .container': {
      width: '100%',
      textAlign: 'left',
      '& H1, & H2, & p': {
        textAlign: 'right',
        margin: '0 0 0.25em 0',
        padding: '0',
      },
      '&:last-of-type': {
        '& H1, & H2, & p': {
          margin: '0',
        },
      },
    },
    '& .sequence.sequence-heading-one, & .sequence.sequence-heading-two': {
      '& .element:last-of-type': {
        opacity: '0.65',
        marginTop: '0.5em',
      },
    },
    '& .sequence.sequence-paragraph': {
      '& .element': {
        margin: '0 0 0.6em 0',
      },
      '& .element:last-of-type': {
        margin: '0',
      },
    },

  },

},[

  when(
    label(plainText(atLeast(1)), "group-text"),
    label(list(exactly(1)), "group-list"),
  ).score(0.025),

], {
  scalingSelector: '.group-list, .group-text',
});

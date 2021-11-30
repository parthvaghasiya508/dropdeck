import { Remix } from "../../../Remix";
import { anyElement, list, plainText, label } from "../../../match/Matchers";
import { anyNumber, atLeast } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Unordered list items presented as horizontal panels.
 */
export const listUnorderedPanelsRemix = new Remix('list-unordered-panels', {
  '& *': { boxSizing: 'border-box', },
  justifyContent: 'center',
  '& .container': {
    overflow: 'hidden',
    margin: '0 auto',
    '& .container': { width: '100%', },
  },

  // lists
  '& .container-bulleted-list, & .container-numbered-list': {
    width: '100%',
    margin: '0 auto',
    '& p': {
      width: '100%',
    },
    '& ul, & ol': {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '0.75em 0 0 0',
      textAlign: 'center',
      '& li': {
        width: 'auto',
        margin: '1em',
        padding: '0.75em 1.15em',
        maxWidth: '44%',
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '5em',
        '& p': { 
          textAlign: 'center',
          fontWeight: '500',
          lineHeight: '1.25',
          letterSpacing: '-0.01em',
        },
        '& ul, & ol': {
          margin: '0 0 0 -1.5em',
          display: 'block',
          width: 'auto',
          padding: '0',
          '& li': {
            borderRadius: '5em',
            display: 'inline-block',
            maxWidth: '100%',
            border: '2px solid rgba(0,0,0,0.2)',
            '& p': {
              width: 'auto',
            },
          },
        },

      },
    },
    '& ul': {
      '& li': {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': {
          display: 'none', 
        },
        '& ul': {
          margin: '0.75em 0 0 0!important',
          alignSelf: 'stretch',
          '& li': {
            margin: '0 0.5em 0.5em 0.5em !important',
            padding: '0.5em',
            '&:last-of-type': {
              margin: '0 0.5em !important',
            },
          },
        },
      },
    },
    '& ol': {
      '& li': {
        padding: '0.75em 1.15em 0.75em 2.5em !important',
        '& p': { 
          textAlign: 'left !important',
          fontWeight: '500',
        },
        '&:before': {
          marginLeft: '-1.25em',
        },
        '& ol': {
          '& li': {
            padding: '1.5em 1.5em 1.5em 3em',
            '& p': { textAlign: 'left', },
            '& ol': {
              margin: '0.75em 0 0 0',
              '& li': {
                margin: '0 0.5em 0.5em 0 !important',
                padding: '0.5em 0.75em 0.5em 2.5em',
              },
            },
          },
        },
      },
    },
  },

  // GROUP TEXT
  '& .group-text-after, & .group-text-before': {
    overflow: 'hidden',
    fontSize: '95%',
    marginTop: '1em',
    width: '100%',
    textAlign: 'center',
    '& .container': {
      width: '100%',
      textAlign: 'center',
      '&:first-of-type': {
        '& .element': { 
          '& h1, & h2, & p': { 
            paddingTop: '0.25em',
          },
        },
      },
      '&:last-of-type': {
        '& .element': { 
          '& h1, & h2, & p': { 
            paddingBottom: '0.25em',
            marginBottom: '0', 
          },
        },
      },
    },
    '& h1': { marginBottom: '0.25em', },
  },
  '& .group-text-before': {
    marginTop: '0',
    marginBottom: '1em',
  },

},[
  when(
    label(plainText(anyNumber), "group-text-before"),
    list(atLeast(1)),
    label(plainText(anyNumber), "group-text-after"),
  )
], {
  featured: true,
  scalingSelector: '.container',
});

import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { label, logo, logoList, plainText } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";

export const MAX_LOGOS = 28;

/**
 * Open grid, no borders.
 */
export const logosOpenGridRemix = new Remix('logos-open-grid', {

  padding: '4.5%',

  // Containers
  '& .container': {
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
  },

  // Logo
  '& .container-logo': {
    margin: '0 0 1em 0',
    '& img': {
      width: 'auto',
      height: '100%',
      padding: '3%',
      boxSizing: 'border-box',
      maxHeight: '6em',
    },
  },

  // Logos
  '& .container-logo-list': {
    width: '100%',
    '& .element .logos': {
      '& *': { boxSizing: 'border-box', },
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0.75em 0',
      padding: '0',
      width: '100%',
      height: 'auto',
      minHeight: '40%',
      '& .imgWrap': {
        margin: '0',
        padding: '0.25% 4.5%',
        textAlign: 'center',
        flex: '0 0 30%',
        height: 'auto',
        display: 'block',
        '&.opaqueBg': {
          borderRadius: '0.5em',
          padding: '1em 0.5em',
        },
        '& img': {
          objectFit: 'contain',
          padding: '0',
          width: '85%',
          margin: '0.85em 0',
          maxHeight: '7em',
        },
      },

      //  1 logo
      '&[data-length="1"]': {
        '& .imgWrap': {
          flex: '0 0 35%',
          '& img': {
            maxHeight: '7em',
          },
        },
      },

      //  2 logos
      '&[data-length="2"]': {
        '& .imgWrap': {
          flex: '0 0 35%',
          '& img': {
            maxHeight: '7em',
          },
        },
      },

      //  3 logos
      '&[data-length="3"]': {
        '& .imgWrap': {
          flex: '0 0 30%',
          '& img': {
            maxHeight: '6em',
          },
        },
      },

      //  4 logos
      '&[data-length="4"]': {
        '& .imgWrap': {
          flex: '0 0 25%',
          '& img': {
            maxHeight: '4.5em',
          },
        },
      },

      //  5 - 15
      '&[data-length="5"], &[data-length="6"], &[data-length="7"], &[data-length="8"], &[data-length="9"], &[data-length="10"], &[data-length="11"], &[data-length="12"], &[data-length="13"], &[data-length="14"], &[data-length="15"]': {
        '& .imgWrap': {
          flex: '0 0 20%',
          '& img': {
            maxHeight: '4em',
          },
        },
      },

      //  16 - 28
      '&[data-length="16"], &[data-length="17"], &[data-length="18"], &[data-length="19"], &[data-length="20"], &[data-length="21"], &[data-length="22"], &[data-length="23"], &[data-length="24"], &[data-length="25"], &[data-length="26"], &[data-length="27"], &[data-length="28"]': {
        '& .imgWrap': {
          flex: '0 0 16.6%',
          '& img': {
            maxHeight: '3.5em',
          },
        },
      },
    },
  },

  // GROUP TEXT
  '& .group-text-after, & .group-text-before, & .group-text-before-logo': {
    overflow: 'hidden',
    fontSize: '95%',
    marginTop: '1em',
    width: '100%',
    boxSizing: 'border-box',
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
  '& .group-text-before, & .group-text-before-logo': {
    marginTop: '0',
    marginBottom: '1em',
  },

},[

  when(
    label(plainText(anyNumber), "group-text-before-logo"),
    logo(once),
    label(plainText(anyNumber), "group-text-before"),
    logoList(),
    label(plainText(anyNumber), "group-text-after"),
  ).score(200),

  when(
    label(plainText(anyNumber), "group-text-before"),
    logoList(),
    label(plainText(anyNumber), "group-text-after"),
  ).score(200),

], {
  featured: true,
  scalingSelector: '.group-text-before-logo, .group-text-before, .group-text-after',

});

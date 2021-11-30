import * as culori from "culori";
import { Remix } from "../../../Remix";
import { label, list, bulletedList, plainText, image, } from "../../../match/Matchers";
import { anyNumber, atLeast, between, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

export const textListPanelsRemix = new Remix('textlist-panels', (colorChart) => ({
  '& *': { boxSizing: 'border-box !important' },
  backgroundColor: `${colorChart.background()}`,
  padding: '0',
  flexDirection: 'row',
  // If no image then apply background colour (currently disabled)
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(90deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.03)) 60%',
  },

  // Image bg
  '& .container-image': {
    zIndex: '0',
    position: 'absolute',
    left: '0',
    width: '65%',
    opacity: '0.85',
    '& img': {
      objectFit: 'cover',
    }
  },

  // Text above image bg
  '& .group-text': {
    overflow: 'hidden', 
    maxHeight: '100%',
    zIndex: '1',
    position: 'relative',
    textAlign: 'left',
    width: '65%',
    display: 'flex',
    padding: '6% !important',
    margin: 'auto 0 0 0',
    flexWrap: 'wrap',
    fontSize: '0.9',
    '& .group-text': {
      display: 'contents',
    },
    '& .container': {
      width: '100%',
      fontSize: '85%',
      '& H1, & H2, & P': {
        textAlign: 'left',
      },
      '& H1': {
        marginBottom: '0 !important',
        lineHeight: '1.1',
        fontSize: '4em',
      },
      '& H2': {
        marginBottom: '-0.04em !important',
      },
      '&:last-of-type': {
        '& h1, & h2, & p': {
          marginBottom: '0 !important',          
        },        
      },
    },
    '& .container-heading-one + .container-heading-two h2': {
      marginTop: '0.35em',
    },
    '& .container-heading-two + .container-heading-one h1': {
      marginTop: '0.25em',
    },
    '& .container-heading-one + .container-paragraph p:first-of-type, & .container-heading-two + .container-paragraph p:first-of-type': {
      marginTop: '0.75em',
    },

  },

  // List
  '& .group-list': {
    overflow: 'hidden',
    width: '35%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '2em',
    '& .element': {
      height: '100%',
    },
    '& .container-bulleted-list, & .container-numbered-list': {
      fontSize: '0.9em',
      padding: '0',
      '& ul, & ol': {
        margin: 'auto 0',
        padding: '0',
        height: '100%',
        '& li': {
          margin: '0',
          '&:before': {
            height: '100%',
            position: 'relative',
            left: '-0.25em',
            content: 'counter(listcounter) "‒";',
            width: 'auto',
            letterSpacing: '0.5em',
          },
        },
      },
      '& ul': {
        padding: '0',
        '& li': {
          padding: '0.75em 0',
          '&:before': {
            display: "none",
          },
          '& p': {
            margin: '0',
          },
        },
      },
      '& ol': {
        '& li': {
          padding: '0.75em 0 0.75em 1em',
          '& p': {
            margin: '0 0 0 0.5em',
          },
        },
      },

    },
  },

}),
[

  when(
    image(exactly(1)),
    label(plainText(atLeast(1)), "group-text"),
    label(bulletedList(exactly(1)), "group-list"),
  ).score(2),

  when(
    label(plainText(atLeast(1)), "group-text"),
    image(exactly(1)),
    label(bulletedList(exactly(1)), "group-list"),
  ),

  when(
    label(plainText(atLeast(1)), "group-text"),
    label(bulletedList(exactly(1)), "group-list"),
    image(exactly(1)),
  )

], {
  scalingSelector: '.group-text, .group-list',
});

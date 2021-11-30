import { anyNumber, atLeast, exactly, once, optional } from "../../../match/expressions/Occurring";
import { bulletedList, headingOne, image, imageLogo, inOrder, label, plainText, or } from "../../../match/Matchers";
import { when } from "../../../match/RemixRule";
import { Remix } from "../../../Remix";

/**
 * Centered quote, additional quotes stack with increased margin. with or without image.
 */
export const coverSimpleRemix = new Remix('cover-simple', {
  alignItems: 'center !important',
  '& .container': {
    '&:not(.container-block-quote)': {
      position: 'relative',
      zIndex: '1',
    },
  },
  '& .container-heading-one': {
    '& h1': {
      fontSize: '3.5em',
      margin: '0 0 0.35em 0',
      lineHeight: '0.925',
      textAlign: 'center',
    },
  },
  '& .container-heading-two': {
    '& h2': {
      margin: '0 0 0.5em 0',
    },
  },
  '& .container-paragraph': {
    '& p': {
      textAlign: 'center',
    },
  },
  // Logo
  '& .container-logo': {
    margin: '0 0 1.5em 0',
    '& .imgWrap': {
      maxWidth: '10em',
      maxHeight: '4.5em',
      '& img': {
        objectFit: 'contain',
      },
    },
  },

  // Main title / Sub / Image / Logo Group
  // --------------------------------------
  '& .title-group': {
    overflow: 'hidden',
    textAlign: 'center',
    zIndex: '10',
    margin: 'auto',
    '& .container-logo .imgWrap': {
      margin: '0 auto',
    },
    '& .container.container-image': {
      position: 'static !important',
      '&:before': {
        width: '0',
        height: '0',
      },
      '& .element': {
        width: '5em',
        height: '5em',
        margin: '0 auto 1.5em auto',
        '& .imgWrap img': {
          borderRadius: '50%',
          objectFit: 'cover',
          position: 'static',
          opacity: '1',
          zIndex: '2',
          filter: 'grayscale(0%) brightness(1) contrast(1)',
        },
      },
    },
    '& .container:last-child': {
      marginBottom: '0.5em',
    },
    // 2 x Logos or Images, or combination of the two
    '&.media-pair': {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      boxSizing: 'border-box',
      '& .container.container-image, & .container.container-logo': {
        boxSizing: 'border-box',
        margin: '0 auto 1em 0 !important',
        border: '0px solid red',
        '&:first-child': {
          margin: '0 0 1em auto !important'
        },
        '& .element': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto !important',
          width: 'auto',
          border: '0px dashed pink',
        },
      },
      '& .container.container-image': {
        width: '6em',
      },
      '& .container.container-logo': {
        width: '9em',
      },
      // size image
      '& .container.container-image .imgWrap': {
        height: '4em',
        maxWidth: '4em',
      },
      // size logo
      '& .container.container-logo .imgWrap': {
        maxHeight: '4em',
        maxWidth: '7.5em',
      },
      // all other elements full width
      '& .container:not(.container-image, .container-logo)': {
        width: '100%',
      },
      // 2 x Logo or Image
      '& .sequence.container.container-logo:first-child, & .sequence.container.container-image:first-child': {
        display: 'flex',
        width: '20em !important',
        margin: '0 auto 1em auto !important',
        '&.container.container-image': {
          width: '40% !important',
        }
      },
    },
    // One image / text / One logo
    '&.title-group-mixed': {
      '& .container.container-logo': {
        margin: '1em auto !important',
        '& .imgWrap': {
          maxHeight: '4em',
          maxWidth: '7.5em',
        },
      },
    },
  },

  // Author / Date Group - LIST
  // --------------------------------------
  '& .inline-group': {
    overflow: 'hidden',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'center',
    justifySelf: 'flex-end',
    zIndex: '1',
    // List
    '& .container-bulleted-list': {
      width: '100%',
      display: 'flex',
      '& ul': {
        display: 'flex',
        margin: '0',
        padding: '0',
        width: '100%',
        '& li': {
          margin: '0 1em !important',
          padding: '0',
          width: '100%',
          '&:before': {
            marginLeft: '-1.25em',
            lineHeight: '0.875',
          },
          '& p': {
            width: 'max-content',
            margin: '0',
            padding: '0',
            fontSize: '0.875em',
          },
          '&:first-child': {
            '&:before': {
              content: '""',
            },
          },
          '&:first-child:last-child': {
            margin: '0 !important',
            '&:before': {
              content: '""',
            },
          },
        },
      },
    },

  },

  // Fullbleed background image
  '& .container.container-image': {
    zIndex: '0 !important',
    position: 'absolute !important',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
    },
    '& .element': {
      margin: '0',
      overflow: "hidden",
      padding: '0',
    },
    '& .imgWrap img': {
      margin: '0',
      padding: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
      position: "absolute",
      opacity: '0.1',
      filter: 'grayscale(100%) brightness(1.35) contrast(1.35)',
    },
  },

  // Pairings
  '&.container-heading-one + .container-heading-two h2': {
    marginTop: '0',
  },
  '&.container-heading-one + .container-block-quote': {
    marginTop: '0.75em',
  },

},[

  // Optional image or Logo in first position
  when(
    label(
      or(
        inOrder(imageLogo(once), plainText(atLeast(1))),
        inOrder(plainText(atLeast(1)), imageLogo(once)),
      ),
      "title-group"
    ),
    label(
      inOrder(
        bulletedList(optional)
      ),
      "inline-group"
    ),
    image(optional),
  ).score(0.02),

  // Img/logo in first pos, then text, then img/logo, then text
  when(
    label(
      inOrder(
        imageLogo(once),
        plainText(atLeast(1)),
        imageLogo(once),
        plainText(anyNumber)
      ),
      "title-group title-group-mixed"
    ),
    label(
      inOrder(
        bulletedList(optional)
      ),
      "inline-group"
    ),
    image(optional),
  ).score(0.02),

  // Optional 2x images AND/OR Logos in first position
  when(
    label(
      or(
        inOrder(imageLogo(exactly(2)), plainText(atLeast(1))),
      ),
      "title-group media-pair"
    ),
    label(
      inOrder(
        bulletedList(optional)
      ),
      "inline-group"
    ),
    image(optional),
  ).score(0.02),

  // Text Only
  when(
    plainText(anyNumber),
    headingOne(exactly(1)),
    plainText(anyNumber),
    label(
      inOrder(
        bulletedList(once) // here we require at least one bullet list to distinguish this remix from block buster
      ),
      "inline-group"
    ),
    image(optional),
  ).score(0.02),
], {
  featured: true,
  scalingSelector: '.title-group, .inline-group',
});

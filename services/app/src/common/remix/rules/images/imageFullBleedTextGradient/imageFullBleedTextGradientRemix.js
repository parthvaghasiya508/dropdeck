import { Remix } from "../../../Remix";
import { Animations } from "../../../effects/Animations";
import { when } from "../../../match/RemixRule";
import { allText, heading, image, inOrder, label, logo, or, paragraph, quote } from "../../../match/Matchers";
import { anyNumber, atLeast, atMost, exactly, once } from "../../../match/expressions/Occurring";
import { moveImagesFirst } from "../../../transforms/moveImages";
import PalettePicker from "../../../palettes/PalettePicker";

/**
 * i4: Single image, full bleed. Dark l-r text gradient background
 */
export const imageFullBleedTextGradientRemix = new Remix('image-1-fullbleed-textgradient', (colorChart) => ({
  '& .deck-logo-container:before': {
    background: '#fff',
  },
  '& .container-image': {
    zIndex: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 !important',
    height: 'auto !important',
    opacity: '0.8',
    '& .element': {
      margin: 0,
      overflow: "hidden",
      padding: 0,
    },
    '& .imgWrap img': {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
      position: "absolute",
    },
  },
  // Everything except images
  '& .container': {
    '&:not(.container-image)': {
      overflow: 'hidden',
    },
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-block-quote, & .container-bulleted-list, & .container-numbered-list': {
    zIndex: '1',
    maxWidth: '75%',
    textShadow: '0 0.02em 0.04em rgba(0,0,0,0.125)',
  },

  '& .container-heading-one, & .container-heading-two': {
    maxWidth: '100%',
  },

  '& .container-heading-one': {
    '& h1': {
      fontSize: '3.5em',
      margin: '0 0 0.35em 0',
      lineHeight: '0.925',
      '& span.emphasis': {
        padding: '0 !important',
      },
    },
  },

  '& .container-heading-one + .container-block-quote': {
    marginTop: '-0.5em',
  },
  // Code
  '& .container-code': {
    zIndex: '1',
    maxWidth: '60%',
    marginTop: '0.5em',
  },
  // Math
  '& .container-math': {
    zIndex: '1',
    maxWidth: '100%',
    '& .katex-display': {
      margin: '0.25em 0',
    },
  },
  // logos (best solution)
  '& .container-logo': {
    '& *': { boxSizing: 'border-box', },
    zIndex: '1',
    margin: '0 0 1.5em 0',
    padding: '0',
    maxHeight: '3.5em',
    minHeight: 'unset',
    width: '35%',
    '& .element': {
      minWidth: '75%',
      maxWidth: '100%',
      width: 'max-content',
      display: 'flex',
      '& .imgWrap img': {
        margin: '0 auto 0 0',
        width: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
      },
    },
  },
  // Safari hack - safari needs a height here:
  "@supports (-webkit-hyphens:none)": {
    "& .container.container-logo": {
      height: '3.5em',
    }
  },
  '& .container-heading-one + .container-logo': {
    marginTop: '0.5em',
  },
  '& .single-text': {
    overflow: 'hidden',
    width: '100%',
    zIndex: '1',
    '& h1, & h2, & p': {
      marginBottom: '0 !important',
      padding: '0.5em 0',
    },
  },

}),[

  when(
    image(once),
    heading(exactly(1)),
    paragraph(anyNumber),
  ).score(60),

  when(
    image(once),
    heading(atLeast(2))
  ).score(60),

  when(
    or(
      inOrder(
        image(once),
        allText(atLeast(1)),
        logo(atMost(1)),
        allText(anyNumber),
      ),
      inOrder(
        image(once),
        allText(anyNumber),
        logo(atMost(1)),
        allText(atLeast(1)),
      ),

    )
  ).score(2),

  // single element remove margin ↓↓

  when(
    image(exactly(1)),
    label(heading(exactly(1)), "single-text"),
  ).score(65),

  when(
    image(exactly(1)),
    label(quote(exactly(1)), "single-text"),
  ).score(30),

],
{
  scalingSelector: '.container:not(.container-image), .single-text',
  animation: Animations.imagePan(),
  featured: true,
  defaultPalette: PalettePicker.image().saturated().first(),
  transform: moveImagesFirst,
});

import { Remix } from "../../../Remix";
import { headingOne, headingTwo, heading, logo, text, label } from "../../../match/Matchers";
import { anyNumber, atLeast, between, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";
import { extractPaletteSuggestions } from "../../../../../modules/presenter/components/Lightbox/transforms/extractPaletteSuggestions";
import PaletteSet from "../../../../../theme/PaletteSet";
import PalettePicker from "../../../palettes/PalettePicker";

/**
 * Large blockbuster heading.
 */
export const textBlockbusterRemix = new Remix('text-blockbuster', {
  '& .container': {
    width: '100%',
    margin: '0 auto',
    overflow: 'hidden',
    '&.container-heading-one': {
      '& h1': {
        textAlign: 'center',
        fontSize: '3.5em',
        margin: '0 0 0.35em 0',
        lineHeight: '1.1',
      },
    },
    '&.container-heading-two, &.container-paragraph, &.container-block-quote blockquote': {
      textAlign: 'center',
    },
    '&.container-heading-one + .container-block-quote': {
      marginTop: '0.75em',
    },

    // '&.container-logo': {
    //   '& *': { boxSizing: 'border-box', },
    //   margin: '0 auto 1.5em auto',
    //   padding: '0',
    //   width: '50%',
    //   height: '4.5em',
    //   '& .element': {
    //     width: '45%',
    //     display: 'flex',
    //     margin: '0 auto',
    //     '& .imgWrap': {
    //       '&.opaqueBg': {
    //         borderRadius: '0.5em',
    //         padding: '1.5em',
    //       },
    //       '& img': {
    //         margin: '0 auto',
    //         width: 'auto',
    //         maxWidth: '100%',
    //       },
    //     },
    //   },
    // },

    // logo
    '&.container-logo': {
      '& *': { boxSizing: 'border-box', },
      zIndex: '1',
      margin: '0 auto 1.5em auto',
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
          margin: '0 auto',
          width: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      },
    },

  },
  '& .sequence-heading-one.container.container-heading-one h1': {
    marginBottom: '0.2em',
  },

  '& .single-text': {
    overflow: 'hidden',
    width: '100%',
    zIndex: '1',
    '& h1, & h2, & p': {
      marginBottom: '0 !important',
      padding: '0.25em',
    },
  },

},[
  // Boost when slide contains only headings:
  when(headingOne(exactly(2))).score(11),
  when(headingOne(exactly(1)), headingTwo(exactly(1))).score(12),
  when(headingTwo(exactly(1)), headingOne(exactly(1))).score(12),
  when(headingTwo(exactly(1)), headingOne(exactly(1)), text(exactly(1))).score(12),
  when(text(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(12),

  // Single element remove margin
  when(
    label(heading(exactly(1)), "single-text"),
  ).score(11),

  // Support for small logo above heading(s)
  when(logo(exactly(1)), headingOne(exactly(1))).score(40),
  when(logo(exactly(1)), headingOne(exactly(2))).score(40),
  when(logo(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(40),
  when(logo(exactly(1)), headingTwo(exactly(1)), headingOne(exactly(1))).score(40),
  when(logo(exactly(1)), headingTwo(exactly(1)), headingOne(exactly(1)), text(exactly(1))).score(40),
  when(logo(exactly(1)), text(exactly(1)), headingOne(exactly(1)), headingTwo(exactly(1))).score(40),

  // Accepts greater range of text content to prevent jumping (PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE)
  when(headingOne(atLeast(1)), text(anyNumber)),
  when(headingOne(exactly(1)), text(between(1, 2))).score(12),
  when(text(between(1, 2)), headingOne(exactly(1))).score(12), // Expanded to allow reverse order

  when(logo(exactly(1)), headingOne(atLeast(1)), text(anyNumber)),
  when(logo(exactly(1)), headingOne(exactly(1)), text(between(1, 2))).score(40),
  when(logo(exactly(1)), text(between(1, 2)), headingOne(exactly(1))).score(40),

], {
  scalingSelector: '.container, .single-text',
  featured: true,
  uniformFontScaling: true,
  defaultPalette: PalettePicker.theme().at(1),

});

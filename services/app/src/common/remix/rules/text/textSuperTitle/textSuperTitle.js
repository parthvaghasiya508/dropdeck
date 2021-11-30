import { Remix } from "../../../Remix";
import { headingOne, headingTwo, logo, paragraph, quote, text, label, heading, inOrder } from "../../../match/Matchers";
import { between, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";
import PalettePicker from "../../../palettes/PalettePicker";

const LABEL_SINGLE = "single-text";
const LABEL_MULTI = "multi-text";

/**
 * Super big title - H1 / H2.
 */
export const textSuperTitleRemix = new Remix('text-supertitle', {
  padding: '6% 4.5%',
  '& .container': {
    width: '100%',
    margin: '0 auto',
    overflow: 'hidden',
    // H1
    '&.container-heading-one': {
      '& h1': {
        textAlign: 'center',
        margin: '0 0 4% 0', // percentage margin bottom is 3.5% of container width - which is a constant (was 0.005em)
        fontSize: '9em',
        lineHeight: '1',
        letterSpacing: '-0.04em',
      },
    },

    // H2
    '&.container-heading-two': {
      '& h2': {
        textAlign: 'center',
        margin: '0 0 3% 0', // percentage margin bottom is 3.5% of container width - which is a constant (was 0.005em)
        fontSize: '2.75em',
        lineHeight: '1',
      },
    },

    // P / Quote
    '&.container-paragraph': {
      textAlign: 'center',
      lineHeight: '1',
      maxWidth: '95%',
      margin: '0 auto',
      '& p': {
        margin: '0 0 2% 0', // percentage margin bottom is 3.5% of container width - which is a constant (was 0.005em)
      },
    },

    '&.container-block-quote blockquote': {
      textAlign: 'center',
      maxWidth: '95%',
      margin: '0 auto',
      '& p': {
        margin: '0 0 0.25em 0.55em',
      },
    },

    '&.container-paragraph .element + .element': {
      margin: '2% 0 0 0',
    },

    // H1 + Quote, H2 + Quote
    '&.container-heading-one + .container-block-quote': {
      marginTop: '0',
    },
    '&.container-heading-two + .container-block-quote': {
      marginTop: '2%',
    },
    '&.container-paragraph + .container-heading-one, &.container-paragraph + .container-heading-two': {
      marginTop: '1.5em',
    },
    '&.container-heading-one + .container-paragraph, &.container-heading-two + .container-paragraph': {
      marginTop: '0.25em',
    },

    // Logo
    '&.container-logo': {
      '& *': { boxSizing: 'border-box', },
      margin: '0 auto 1em auto',
      padding: '0',
      width: '50%',
      height: '4.5em',
      '& .element': {
        width: '45%',
        display: 'flex',
        margin: '0 auto',
        '& .imgWrap img': {
          margin: '0 auto',
          width: 'auto',
          maxWidth: '100%',
        },
      },
    },
  },

  // Sequences H1 + H1 / H2 + H2
  '& .sequence-heading-one.container.container-heading-one h1': {
    padding: '0.1em 0',
    margin: '0',
  },

  '& .multi-text': {
    overflow: 'hidden',
    width: '100%',
    zIndex: '1',
  },

  '& .single-text': {
    overflow: 'hidden',
    width: '100%',
    zIndex: '1',
    '& h1, & h2, & p': {
      marginBottom: '0 !important',
      padding: '0.125em 0',
    },
  },

},[

  // Catch all
  when(
    label(text(between(2, 4)), LABEL_MULTI)
  ).score(5),

  // single element boost variants - added wrapper for centering and highlighting
  when(
    label(headingOne(exactly(1)), LABEL_SINGLE),
  ).score(10),

  when(
    label(headingTwo(exactly(1)), LABEL_SINGLE),
  ).score(4),

  when(
    label(paragraph(exactly(1)), LABEL_SINGLE),
  ).score(4),

  // double element boost variants
  when(
    label(headingTwo(exactly(2)), LABEL_MULTI)
  ).score(4),
  when(
    label(quote(exactly(2)), LABEL_MULTI)
  ).score(4), // not being picked up?

  when(
    label(inOrder(
      headingOne(exactly(1)),
      headingTwo(exactly(1))
    ), LABEL_MULTI)
  ).score(10),

  when(
    label(inOrder(
      headingOne(exactly(1)),
      quote(exactly(1))
    ), LABEL_MULTI)
  ).score(4), // not being picked up?

  when(
    label(inOrder(
      headingTwo(exactly(1)),
      headingOne(exactly(1))
    ), LABEL_MULTI)
  ).score(10),

  // Support for small logo above heading(s)
  when(
    label(inOrder(
      logo(exactly(1)),
      text(between(1,4))
    ), LABEL_MULTI)
  ).score(11),

  when(
    label(inOrder(
      logo(exactly(1)),
      heading(between(1, 2))
    ), LABEL_MULTI)
  ).score(25),

  when(
    label(inOrder(
      logo(exactly(1)),
      headingOne(exactly(1)),
      paragraph(exactly(1))
    ), LABEL_MULTI)
  ).score(25),

  when(
    label(inOrder(
      logo(exactly(1)),
      headingTwo(exactly(1)),
      headingOne(exactly(1)),
      text(exactly(1))
    ), LABEL_MULTI)
  ).score(25),

  when(
    label(inOrder(
      logo(exactly(1)),
      text(exactly(1)),
      headingOne(exactly(1)),
      headingTwo(exactly(1))
    ), LABEL_MULTI)
  ).score(25),

], {
  scalingSelector: ".container:not(.container-logo), .single-text, .multi-text, .single-text > .container, .multi-text > .container",
  uniformFontScaling: true,
  defaultPalette: PalettePicker.theme().at(2),
});

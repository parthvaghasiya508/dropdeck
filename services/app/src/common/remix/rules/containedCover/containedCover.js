import { Remix } from "../../Remix";
import { Animations } from "../../effects/Animations";
import { when } from "../../match/RemixRule";
import { image, inOrder, label, or, allText } from "../../match/Matchers";
import { atLeast, once } from "../../match/expressions/Occurring";

const fontSettings = (colorChart, title) => {
  const settings = {
  };
  if (colorChart) {
    settings.color = title ? `${colorChart.title()}` : `${colorChart.text()}`;
  }
  return settings;
};

// styles
const boxOutCss = (colorChart) => ({
  justifyContent: 'center !important', // |
  alignItems: ' flex-start !important', // -
  '& .deck-logo-container:before': {
    background: '#fff',
  },
  '& .group-text-before, & .group-text-after': {
    zIndex: '1',
    padding: '1.5em 1.75em',
    width: '41%',
    borderRadius: '0.125em',
    overflow: 'hidden',
  },
  // container/box
  '&.boxouttext .group-text-before, &.boxouttext-r .group-text-before, &.boxouttext .group-text-after, &.boxouttext-r .group-text-after': {
    background: `${colorChart.background()}`,
    boxShadow: '0 0.125em 0.25em rgba(0,0,0,0.15)',
    '& .group-text-before, & .group-text-after': {
      width: '100%',
      padding: '0',
      margin: '0',
      boxShadow: 'none',
      background: 'transparent',
    },
    // Ensure single element remains vertically centred
    '& .container:last-of-type .element:last-of-type *, & .container:first-of-type:last-of-type .element *': {
      marginBottom: '0 !important',
    },
  },
  '&.boxouttext-r': {
    alignItems: 'flex-end !important',
  },
  // Math
  '& .container-math': {
    '& .katex-display': {
      margin: '0',
    },
  },
  // Code
  '& .container-code': {
    paddingBottom: '1em',
    marginBottom: '0',
  },
  // List
  '& .container-numbered-list li, & .container-bulleted-list li': {
    padding: '0.25em 0',
  },
  // bg image
  '& .container-image': {
    border: '0',
    zIndex: '0',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
    width: '100%',
    padding: '0',
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
    },
  },
  '& .container-heading-one, & .container-heading-two, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-paragraph': {
    width: 'auto',
    '& H1, & H2': fontSettings(colorChart, true),
    '& ol, & ul': fontSettings(colorChart),
    // '& ol, & ul': {
    //   marginTop: '0.6em',
    // },
  },
  // Quotes tweaked to fit container
  '& .container-block-quote': { width: '100%', },

  '& .container-block-quote + .container-paragraph': {
    marginTop: '-0.75em',
  },
  '& .container-paragraph': {
    '& .element + .element': {
      marginTop: '0.5em',
    },
  },
});

const imageCoverRule = when(
  or(
    inOrder(
      label(allText(atLeast(1)), "group-text-before"),
      image(once)
    ),
    inOrder(
      image(once),
      label(allText(atLeast(1)), "group-text-after")
    ),
  )
);

/**
 * Full Bleed BG. Text boxout is 50% wide, coloured background, and offset left.
 */

export const boxOutTextLeftRemix = new Remix('boxouttext',
  (colorChart) => boxOutCss(colorChart),
  imageCoverRule,
  {
    scalingSelector: ".group-text-before, .group-text-after",
    animation: Animations.imagePan()
  });

export const boxOutTextRightRemix = new Remix('boxouttext-r',
  (colorChart) => boxOutCss(colorChart),
  imageCoverRule,
  {
    scalingSelector: ".group-text-before, .group-text-after",
    animation: Animations.imagePan()
  });

import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, text } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";
import { Animations } from "../../../effects/Animations";
import { moveImagesFirst } from "../../../transforms/moveImages";

/**
 * i3:   Single image, full bleed. Text appears against white bg.
 */
export const imageFullBleedRemix = new Remix('image-1-fullbleed', (colorChart) => ({
  padding: '4.5%',
  justifyContent: 'flex-end !important',
  '& .deck-logo-container:before': {
    background: '#fff',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    textAlign: 'left',
  },
  '& .group-text-before, & .group-text-after': {
    overflow: 'hidden',
    padding: '1em 1.25em',
    background: `${colorChart.background()}`,
    boxShadow: '0 0.05em 0.05em rgba(0,0,0,0.2)',
    zIndex: '1',
    width: 'auto',
    maxWidth: '73%',
    maxHeight: '40%',
    '& h1, & h2, & p': {
      width: 'auto',
    },
    // Quotes tweaked to fit container
    '& .container-block-quote': { width: '100%', },
    // Margins reduced to bring text together more successfully:
    '& h1, & h2': {
      margin: '0 0 0.166em 0',
    },
    '& p': {
      margin: '0 0 0.322em 0',
    },
    // Margin removed on last element of last container:
    '& .container:last-child *:last-child': { margin: '0 !important', },
    // Nested grouping reset styling:
    '& .group-text-before, & .group-text-after': {
      padding: '0',
      boxShadow: 'none',
    },
    // Sequential Paragraphs
    '& .container.container-paragraph': {
      '& .element + .element': {
        marginTop: '0.5em !important',
        marginBottom: '0 !important',
      },
    },

  },

  // Text Split by image:
  '& .group-text-before + .container-image + .group-text-after': {
    marginTop: '-0.5em',
    paddingTop: '0',
  },

  '& .container-image': {
    zIndex: '0',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
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
}),
when(
  image(once),
  label(text(anyNumber), "group-text-before"),
).score(40),
{
  animation: Animations.imagePan(),

  // We apply a "magnet" transformation to list out all the images first, followed by
  // the rest of the content on the slide. The rule above runs after this transformation.
  transform: moveImagesFirst,

  scalingSelector: '.group-text-before',
  featured: true,
});

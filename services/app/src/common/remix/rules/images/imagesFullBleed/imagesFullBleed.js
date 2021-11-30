import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { text, image, label } from "../../../match/Matchers";
import { anyNumber, between, exactly } from "../../../match/expressions/Occurring";

/**
 * 2-4 images, aligned horizontally, full bleed.
 */
export const imagesFullBleedRemix = new Remix('images-n-fullbleed', (colorChart) => ({
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
    maxWidth: '73%',
    maxHeight: '40%',

    '& h1, & h2, & p': { width: 'auto', },
    // Quotes tweaked to fit container
    '& .container-block-quote': { width: '100%', paddingLeft: '1.125em', },
    // Margins reduced to bring text together more successfully:
    '& h1, & h2': { margin: '0 0 0.166em 0', },
    '& p': { margin: '0 0 0.322em 0', },
    // Margin removed on last element of last container:
    '& .container:last-child *:last-child': { margin: '0', },
    // Nested grouping reset styling:
    '& .group-text-before, & .group-text-after': {
      padding: '0',
      boxShadow: 'none',
    },
    // Ensure single element remains vertically centred
    '& .container:last-of-type .element:last-of-type *, & .container:first-of-type:last-of-type .element *': {
      marginBottom: '0 !important',
    },
  },
  // Text Split by image:
  '& .group-text-before + .container-image + .group-text-after': {
    marginTop: '-0.5em',
    paddingTop: '0',
  },
  '& .sequence-image': {
    position: 'absolute',
    width: '100% !important',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    margin: '0 !important',
    height: 'auto !important',
    display: 'flex',
    zIndex: '0',
    '& .element': {
      margin: '0 !important',
      overflow: 'hidden',
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
  },
}),[
  when(image(exactly(2))).score(10),
  when(image(exactly(3))).score(10),
  when(image(exactly(4))).score(10),
  when(
    label(text(anyNumber), "group-text-before"),
    image(between(2, 4)),
    label(text(anyNumber), "group-text-after"),
  )
], { 
  featured: true,
  scalingSelector: '.group-text-before, .group-text-after',
});

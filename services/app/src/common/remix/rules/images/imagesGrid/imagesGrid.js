import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, plainText } from "../../../match/Matchers";
import { anyNumber, exactly, atLeast } from "../../../match/expressions/Occurring";

/**
 * 12+ images, masonry grid layout, full bleed.
 */
export const imagesGrid = new Remix('images-grid', (colorChart) => ({
  justifyContent: 'center !important',
  alignItems: 'center !important',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    textAlign: 'left',
  },
  '& .group-text-before, & .group-text-after': {
    border: '1px solid orange',
    padding: '1em 1.25em',
    background: `${colorChart.background()}`,
    boxShadow: '0 0.05em 0.05em rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
    zIndex: '1',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    '& h1, & h2, & p': { width: 'auto', },
    '& .container-block-quote': { width: '100%', paddingLeft: '1.125em', },
    '& h1, & h2': { margin: '0 0 0.166em 0', },
    '& p': { margin: '0 0 0.322em 0', },
    '& .container:last-child *:last-child': { margin: '0', },
    '& .group-text-before, & .group-text-after': {
      padding: '0',
      boxShadow: 'none',
    },
  },
  '& .sequence-image': {
    boxSizing: 'border-box',
    display: 'block',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    overflow: 'hidden',
    lineHeight: '0',
    columnGap: '0.2em',
    columnCount: '4',

    '&[data-length="12"]': {
      border: '2px solid orange',
    },
    '&[data-length="13"]': {
      border: '2px solid pink',
    },
    '&[data-length="14"]': {
      border: '2px solid blue',
    },
    '&[data-length="15"]': {
      border: '2px solid lime',
    },
    '&[data-length="16"]': {
      border: '2px solid red',
    },

    '& .imgWrap img': {
      height: 'auto',
      width: '100%',
      display: 'block',
      marginBottom: '0.25em',
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
  },
}),[
  when(image(atLeast(12))).score(10),
  when(
    label(plainText(anyNumber), "group-text-before"),
    image(atLeast(12)),
    label(plainText(anyNumber), "group-text-after"),
  )
]);

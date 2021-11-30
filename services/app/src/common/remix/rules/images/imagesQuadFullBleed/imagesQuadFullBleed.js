import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, plainText } from "../../../match/Matchers";
import { anyNumber, exactly } from "../../../match/expressions/Occurring";

/**
 * 4 images, quad layout, full bleed.
 */
export const imagesQuadFullBleed = new Remix('images-4-fullbleed', (colorChart) => ({
  justifyContent: 'center !important',
  alignItems: 'center !important',
  '& .deck-logo-container:before': {
    background: '#fff',
  },
  '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
    textAlign: 'left',
  },
  '& .group-text-before, & .group-text-after': {
    overflow: 'hidden',
    maxHeight: '35%',
    padding: '1em 1.25em',
    background: `${colorChart.background()}`,
    boxShadow: '0 0.05em 0.05em rgba(0,0,0,0.2)',
    zIndex: '1',
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
  },
  '& .sequence-image': {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    '& .element': {
      width: '100% !important',
      height: '100% !important',
      margin: '0 !important',
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
    // 4 images
    '&[data-length="4"]': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '0',
      gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
      height: '100% !important',
      '& .element': {
        height: 'auto !important',
        overflow: 'hidden',
        alignSelf: 'unset !important',
        '&:nth-child(1)': {
          gridRow: '1 / 7',
          gridColumn: '1 / 7',
        },
        '&:nth-child(2)': {
          gridRow: '1 / 7',
          gridColumn: '7 / 13',
        },
        '&:nth-child(3)': {
          gridRow: '7 / 13',
          gridColumn: '1 / 7',
          '& .edit-actions': {
            top: 'unset',
            bottom: '8px',
          },
        },
        '&:nth-child(4)': {
          gridRow: '7 / 13',
          gridColumn: '7 / 13',
          '& .edit-actions': {
            top: 'unset',
            left: 'unset',
            bottom: '8px',
            right: '3px',
          },
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
      },
    },
  },
}),
[
  when(image(exactly(4))).score(15),
  when(
    label(plainText(anyNumber), "group-text-before"),
    image(exactly(4)),
    label(plainText(anyNumber), "group-text-after"),
  )
], {
  scalingSelector: '.group-text-before, .group-text-after',
});

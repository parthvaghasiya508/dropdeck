import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { plainText, label, image, inOrder, text } from "../../../match/Matchers";
import { anyNumber, between, exactly } from "../../../match/expressions/Occurring";
import { imageSizeScalingLevels } from "../imageSizeScalingLevels";

/**
 * 3 images, magazine layout. First image 100h/50w. Remaining two 50h/50w right stacked.
 */
export const imagesMagazine3Remix = new Remix('images-3-magazine', {
  // Sets minimum image height, after which the text will scale down. This will vary based on the scaling level.
  ...imageSizeScalingLevels(),
  padding: '6%',
  // Outer Grid
  '& .grid-container': {
    height: 'auto',
    maxHeight: '100%',
    width: '100%',
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: '0',
    overflow: 'hidden',
    // Just images on slide
    '&[data-length="1"]': {
      '& .container-image': {
        padding: '0',
      },
    },
    // All Containers
    '& .container': {
      boxSizing: 'border-box',
      width: '100%',
      textAlign: 'center',
      padding: '0.15em 0',
      '& h1, & h2': {
        margin: '0 !important',
        lineHeight: '1.25',
      },
      '& p': {
        margin: '0 0 0.5em 0 !important',
        lineHeight: '1.25',
      },
    },
    // Blockquote
    '& .container-block-quote': {
      margin: '0',
      padding: '0.45em 0',
      '& blockquote': {
        textAlign: 'center',
      },
    },
    // when text follows image
    '& .container-image + .container:not(.container-image)': {
      paddingTop: '0',
    },
    // when text is last child
    '& .container:last-child.container-paragraph *:last-child p': {
      marginBottom: '0 !important',
    },
    // when first element IS an image, pull in top edge
    '& .container:first-child.container-image': {
      paddingTop: '0',
    },
    // when last element IS an image or logo, pull in bottom edge
    '& .container:last-child.container-image': {
      paddingBottom: '0',
    },
    // Images Only
    '& .container-image': {
      fontSize: '100%',
      padding: '1.25em 0',
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
    // Sequence layouts
    '& .sequence-image': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '14% 7%',
      gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
      '& .element': {
        height: 'auto',
        overflow: 'hidden',
        '&:nth-child(1)': {
          gridRow: '1 / 3',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
  },

},[

  when(
    label(
      inOrder(
        image(exactly(3)),
      ), "grid-container"
    ),
  ).score(15),

  when(
    label(
      inOrder(
        text(anyNumber),
        image(exactly(3)),
        text(anyNumber),
      ), "grid-container"
    ),
  ),

],{
  scalingSelector: ".grid-container"
});

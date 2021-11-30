//  i2:   Single image, windowed bleed (ie. image fills entire content within gutter).   (Boost 9)
//  ----------------------------------------------------------------------------------------------
import { Remix } from "../../../Remix";
import { Animations } from "../../../effects/Animations";
import { when } from "../../../match/RemixRule";
import { image, plainText, inOrder, label, text } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";
import { imageSizeScalingLevels } from "../imageSizeScalingLevels";

export const imageWindowedRemix = new Remix('image-1-windowed', {

  // Sets minimum image height, after which the text will scale down. This will vary based on the scaling level.
  ...imageSizeScalingLevels(),

  // Reduced slide padding
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
    // Just an image
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
  },
},

when(
  label(
    inOrder(
      text(anyNumber),
      image(once),
      text(anyNumber),
    ), "grid-container"
  ),
).score(30),

{
  featured: true,
  clustering: false,
  scalingSelector: '.grid-container',
});

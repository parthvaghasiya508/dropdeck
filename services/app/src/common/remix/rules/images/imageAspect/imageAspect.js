import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, logo, inOrder, label, text } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";
import { imageSizeScalingLevels } from "../imageSizeScalingLevels";

/**
 * i1: Single image, aspect ratio contained.
 */
export const imageAspectRemix = new Remix('image-1-aspect', {

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
    '& .container:first-child.container-logo, & .container:first-child.container-logo .imgWrap': {
      paddingTop: '0',
    },
    // when last element IS an image or logo, pull in bottom edge
    '& .container:last-child.container-image': {
      paddingBottom: '0',
    },
    '& .container:last-child.container-logo, & .container:last-child.container-logo .imgWrap': {
      paddingBottom: '0',
    },
    // Images and Logos Only
    '& .container-image, .container-logo': {
      fontSize: '100%',
      padding: '1.25em 0',
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
      },
    },
    // Logo
    '& .container-logo': {
      padding: '0',
      '& .imgWrap': {
        maxWidth: '45%',
        margin: '0 auto',
        padding: '1.25em 0',
        boxSizing: 'border-box',
        '& img': {
          height: '100%',
          width: '100%',
          margin: '0',
          padding: '0',
        },
        '&.opaqueBg': {
          borderRadius: '0.5em',
          padding: '1em !important',
          margin: '0 auto',
        },
      },
    },
  },

},[

  when(
    label(
      inOrder(
        text(anyNumber),
        image(once),
        text(anyNumber),
      ), "grid-container"
    ),
  ).score(20),

  when(
    label(
      inOrder(
        text(anyNumber),
        logo(once),
        text(anyNumber),
      ), "grid-container"
    ),
  ).score(35),

], {
  featured: true,
  clustering: false,
  scalingSelector: '.grid-container',
});

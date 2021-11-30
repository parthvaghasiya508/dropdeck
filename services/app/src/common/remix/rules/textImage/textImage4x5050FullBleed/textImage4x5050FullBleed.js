import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, inOrder } from "../../../match/Matchers";
import { exactly } from "../../../match/expressions/Occurring";
import { moveImagesFirst } from "../../../transforms/moveImages";
import { matchTextOrCluster } from "../matchTextOrCluster";

/**
 * @deprecated
 *
 * ti3: 50t/50i full bleed image - 4 x images fill image area inside 2x2 formation
 * This remix should be offered only when the user is currently viewing t13 AND 4 images exist on the slide.
 */
export const textImage4x5050FullBleedRemix = new Remix('textimage4x-5050-fullbleed', (colorChart) => ({
  textAlign: 'left',
  alignItems: 'flex-start',
  '& .container-heading-one, & .container-heading-two, & .container-paragraph, & .container-bulleted-list, & .container-numbered-list, & .container-block-quote, & .container-code, & .container-math': {
    width: '45%',
    textAlign: 'left',
    alignSelf: 'flex-start !important',
  },
  '& .container-block-quote': {
    width: '40%',
  },
  '& .container-image': {
    position: 'absolute',
    width: '46% !important',
    top: '0',
    bottom: '0',
    right: '0',
    margin: '0 !important',
    height: 'auto !important',
    '& .element': {
      position: 'absolute',
      border: `0.025em solid ${colorChart.background()}`,
      boxSizing: 'border-box',
      width: '50% !important',
      height: '50% !important',
      alignSelf: 'flex-end !important',
      margin: '0 !important',
      '&:nth-of-type(1)': {
        left: '0',
        borderTop: '0',
        borderLeft: '0',
      },
      '&:nth-of-type(2)': {
        right: '0',
        borderTop: '0',
        borderRight: '0',
      },
      '&:nth-of-type(3)': {
        bottom: '0',
        borderBottom: '0',
        borderLeft: '0',
      },
      '&:nth-of-type(4)': {
        right: '0',
        bottom: '0',
        borderBottom: '0',
        borderRight: '0',
      },
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
  },
  // logos
  '& .container-logo': {
    '& *': { boxSizing: 'border-box', },
    margin: '0 0 1.5em 0',
    padding: '0',
    width: '45%',
    height: '3.5em',
    '& .element': {
      width: '45%',
      display: 'flex',
      '& .imgWrap img': {
        margin: '0 auto 0 0',
        width: 'auto',
        maxWidth: '100%',
      },
    },
  },
  // Math
  '& .container-math': {
    margin: '0 0 0.5em 0',
    '& .katex-display': {
      margin: '0',
    },
  },
  // Code
  '& .container-code': {
    margin: '0.5em 0 1em 0',
  },

  // cluster + nested cluster
  '& .cluster': {
    width: '45%',
    '& .container': { width: '100%' },
    '& .cluster': { width: '100%' },
  },
  // sequence contains cluster
  '& .sequence': {
    width: '45%',
    '& .cluster': { width: '100%' },
  },
  '& .cluster + .container-image + .cluster': {
    margin: '-0.75em 0 0 0',
  },

}),

// This rule says: slide should contain, in any order:
// - exactly 4 images
// - at least 1 text/list OR cluster of text/list
when(
  inOrder(
    image(exactly(4)),
    matchTextOrCluster,
  ),
),
{
  deprecated: true,
  transform: moveImagesFirst,
});

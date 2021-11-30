// ti4: 25i/75t full bleed single image (additional images stack)
// ---------------------------------
import { Remix } from "../../../../../Remix";
import { when } from "../../../../../match/RemixRule";
import { image, inOrder, label } from "../../../../../match/Matchers";
import { between } from "../../../../../match/expressions/Occurring";
import { matchTextOrCluster } from "../../../matchTextOrCluster";
import { moveImagesFirst } from "../../../../../transforms/moveImages";
import { stylingFor2575 } from "../stylingFor2575";

export const textImages2575FullBleedRemix = new Remix(
  'textimages-2575-fullbleed',
  stylingFor2575({
    textAlignment: 'flex-end !important',
    marginAlignment: 'marginLeft',
    clusterImageMargin: '-0.75em 0 0 auto',
    containerImageAlignment: 'left',
  }),

  // This rule says: slide should contain, in any order:
  // - between 1-10 images
  // - at least 1 text/list OR cluster of text/list
  when(
    inOrder(
      image(between(1, 10)),
      label(matchTextOrCluster, 'img-text'),
    ),
  ),
  {
    // We apply a "magnet" transformation to list out all the images first, followed by
    // the rest of the content on the slide. The rule above runs after this transformation.
    transform: moveImagesFirst,
    featured: true,
    clustering: false,
    scalingSelector: '.img-text'
  }
);

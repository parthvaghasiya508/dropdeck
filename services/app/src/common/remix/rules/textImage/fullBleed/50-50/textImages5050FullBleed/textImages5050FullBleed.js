import { Remix } from "../../../../../Remix";
import { when } from "../../../../../match/RemixRule";
import { allTextTable, heading, image, inOrder, label, or, paragraph } from "../../../../../match/Matchers";
import { anyNumber, atLeast, between, once } from "../../../../../match/expressions/Occurring";
import { stylingFor5050 } from "../stylingFor5050";
import { GROUP_IMAGES_LABEL, IMG_TEXT_LABEL, matchSplitImageSequences } from "../../matchSplitImageSequences";
import { matchTextOrCluster } from "../../../matchTextOrCluster";
import { moveImagesFirst } from "../../../../../transforms/moveImages";

/**
 * Declare the CSS generated for this remix.
 */
const css = stylingFor5050({
  textAlignment: 'flex-start !important',
  marginAlignment: 'marginRight',
  clusterImageMargin: '-0.75em 0 0 0',
  containerImageAlignment: 'right',
  groupTextAlignment: 'left',
});

/**
 * Fallback version which "pulls out" all images to one side before evaluation.
 */
const textImages5050FullBleedFallback = new Remix(
  'textimages-5050-fullbleed-fallback',
  css,
  when(
    inOrder(
      image(between(1, 12)),
      matchTextOrCluster,
    ),
  ),
  {
    // We apply a "magnet" transformation to list out all the images first, followed by
    // the rest of the content on the slide. The rule above runs after this transformation.
    transform: moveImagesFirst,
  }
);

/**
 * 50t/50i full bleed images (up to 12)
 */
export const textImages5050FullBleedRemix = new Remix(
  'textimages-5050-fullbleed',
  css,
  [
    when(
      label(allTextTable(atLeast(1)), IMG_TEXT_LABEL),
      label(image(between(1, 12)), GROUP_IMAGES_LABEL),
    ).score(45),

    when(
      label(paragraph(atLeast(1)), IMG_TEXT_LABEL),
      image(between(1, 12))
    ).score(5),

    when(
      or(
        inOrder(
          label(allTextTable(atLeast(1)), IMG_TEXT_LABEL),
          image(once),
          label(allTextTable(anyNumber), IMG_TEXT_LABEL),
        ),
        inOrder(
          label(allTextTable(anyNumber), IMG_TEXT_LABEL),
          image(once),
          label(allTextTable(atLeast(1)), IMG_TEXT_LABEL),
        )
      )
    ).score(5),

    when(
      or(
        inOrder(
          label(heading(atLeast(2)), IMG_TEXT_LABEL),
          image(once),
          label(heading(anyNumber), IMG_TEXT_LABEL),
        ),
        inOrder(
          label(heading(anyNumber), IMG_TEXT_LABEL),
          image(once),
          label(heading(atLeast(2)), IMG_TEXT_LABEL),
        ),
      )
    ).score(50),

    // This rule allows for more complex content in the img-text column
    matchSplitImageSequences(),
  ],
  {
    clustering: false,
    scalingSelector: '.img-text, .container:not(.container-image)',
    featured: true
  }
).then(textImages5050FullBleedFallback);

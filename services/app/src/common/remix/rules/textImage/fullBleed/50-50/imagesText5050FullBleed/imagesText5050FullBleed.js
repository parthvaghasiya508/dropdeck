import { Remix } from "../../../../../Remix";
import { when } from "../../../../../match/RemixRule";
import { heading, image, inOrder, label, or, paragraph } from "../../../../../match/Matchers";
import { anyNumber, atLeast, between, exactly, once } from "../../../../../match/expressions/Occurring";
import { moveImagesFirst } from "../../../../../transforms/moveImages";
import { matchTextOrCluster } from "../../../matchTextOrCluster";
import { stylingFor5050 } from "../stylingFor5050";
import { IMG_TEXT_LABEL, matchSplitImageSequences } from "../../matchSplitImageSequences";

/**
 * Declare the CSS generated for this remix.
 */
const css = stylingFor5050({
  textAlignment: 'flex-end !important',
  marginAlignment: 'marginLeft',
  clusterImageMargin: '-0.75em 0 0 auto',
  containerImageAlignment: 'left',
  groupTextAlignment: 'right',
});

/**
 * Fallback version which "pulls out" all images to one side before evaluation.
 */
export const imagesText5050FullBleedFallbackRemix = new Remix(
  'imagestext-5050-fullbleed-fallback',
  css,
  when(
    inOrder(
      image(between(1, 12)),
      label(matchTextOrCluster, 'img-text'), // just added
    ),
  ).score(55),
  {
    // We apply a "magnet" transformation to list out all the images first, followed by
    // the rest of the content on the slide. The rule above runs after this transformation.
    transform: moveImagesFirst,
    scalingSelector: '.img-text',
  }
);

/**
 * 50t/50i full bleed images (up to 4 stacked)
 */
export const imagesText5050FullBleedRemix = new Remix(
  'imagestext-5050-fullbleed',
  css,
  [
  // boost when at least 1 heading + optional para + 1 image
    when(
      or(
        inOrder(
          label(heading(exactly(1)), IMG_TEXT_LABEL),
          image(once),
          label(paragraph(anyNumber), IMG_TEXT_LABEL),
        ),
        inOrder(
          label(heading(exactly(1)), IMG_TEXT_LABEL),
          label(paragraph(anyNumber), IMG_TEXT_LABEL),
          image(once)
        ),
        inOrder(
          label(paragraph(anyNumber), IMG_TEXT_LABEL),
          image(once),
          label(heading(atLeast(1)), IMG_TEXT_LABEL),
        ),
      )
    ).score(55),

    // This rule allows for more complex content in the img-text column
    matchSplitImageSequences(),
  ],
  {
    clustering: false,
    scalingSelector: '.img-text',
    featured: true,
  }
).then(imagesText5050FullBleedFallbackRemix);

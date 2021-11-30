import { Remix } from "../../../../../Remix";
import { when } from "../../../../../match/RemixRule";
import { allText, heading, image, inOrder, label, or, paragraph } from "../../../../../match/Matchers";
import { anyNumber, atLeast, between, once } from "../../../../../match/expressions/Occurring";
import { stylingForWideImg } from "../stylingForWideImg";
import { matchTextOrClusterWideImg } from "../../../matchTextOrClusterWideImg";
import { moveImagesFirst } from "../../../../../transforms/moveImages";
import { GROUP_IMAGES_LABEL, IMG_TEXT_LABEL, matchSplitImageSequencesWideImg } from "../../matchSplitImageSequencesWideImg";

/**
 * Declare the CSS generated for this remix.
 */
const css = stylingForWideImg({
  textAlignment: 'flex-start !important',
  marginAlignment: 'marginRight',
  clusterImageMargin: '-0.75em 0 0 0',
  containerImageAlignment: 'right',
  groupTextAlignment: 'left',
});

/**
 * Fallback version which "pulls out" all images to one side before evaluation.
 */
const textImagesWideImgFullBleedFallback = new Remix(
  'textimages-WideImg-fullbleed-fallback',
  css,
  when(
    inOrder(
      image(between(1, 12)),
      matchTextOrClusterWideImg,
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
export const textImagesWideImgFullBleedRemix = new Remix(
  'textimages-WideImg-fullbleed',
  css,
  [
    when(
      label(allText(atLeast(1)), IMG_TEXT_LABEL),
      label(image(between(1, 12)), GROUP_IMAGES_LABEL),
    ).score(4),

    when(
      label(paragraph(atLeast(1)), IMG_TEXT_LABEL),
      image(between(1, 12))
    ).score(4),

    when(
      or(
        inOrder(
          label(allText(atLeast(1)), IMG_TEXT_LABEL),
          image(once),
          label(allText(anyNumber), IMG_TEXT_LABEL),
        ),
        inOrder(
          label(allText(anyNumber), IMG_TEXT_LABEL),
          image(once),
          label(allText(atLeast(1)), IMG_TEXT_LABEL),
        )
      )
    ).score(4),

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
    ).score(10),

    // This rule allows for more complex content in the img-text column
    matchSplitImageSequencesWideImg(),
  ],
  {
    clustering: false,
    scalingSelector: `.${IMG_TEXT_LABEL}, .container:not(.container-image)`,
    featured: true
  }
).then(textImagesWideImgFullBleedFallback);

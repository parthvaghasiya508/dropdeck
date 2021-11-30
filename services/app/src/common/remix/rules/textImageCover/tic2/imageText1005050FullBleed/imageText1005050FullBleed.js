import { Remix } from "../../../../Remix";
import { Animations } from "../../../../effects/Animations";
import { tic2Styling } from "../tic2Styling";
import { when } from "../../../../match/RemixRule";
import { once } from "../../../../match/expressions/Occurring";
import { inOrder, or, headingParagraphQuoteCodeMath, image } from "../../../../match/Matchers";

/**
 * tic2 v1 - image top, text bottom
 */
export const imageText1005050FullBleedRemix = new Remix('imagetext-1005050-fullbleed',
  tic2Styling('top', 'flex-end !important'),
  when(
    or(
      inOrder(image(once), headingParagraphQuoteCodeMath(once)),
      inOrder(headingParagraphQuoteCodeMath(once), image(once))
    )
  ),
  {
    // animation: Animations.imagePan(),
    scalingSelector: ".container:not(.container-image)"
  });

import { Remix } from "../../../../Remix";
import { Animations } from "../../../../effects/Animations";
import { tic2Styling } from "../tic2Styling";
import { when } from "../../../../match/RemixRule";
import { once } from "../../../../match/expressions/Occurring";
import { image, inOrder, or, headingParagraphQuoteCodeMath } from "../../../../match/Matchers";

/**
 * tic2 v2 - image top, text bottom
 */
export const textImage5050100FullBleedRemix = new Remix('textimage-5050100-fullbleed',
  tic2Styling('bottom', 'flex-start !important'),
  when(
    or(
      inOrder(image(once), headingParagraphQuoteCodeMath(once)),
      inOrder(headingParagraphQuoteCodeMath(once), image(once))
    )
  ),
  {
    scalingSelector: ".container:not(.container-image)",
  });

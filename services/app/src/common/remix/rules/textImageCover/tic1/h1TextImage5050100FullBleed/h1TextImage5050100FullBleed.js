import { Remix } from "../../../../Remix";
import { Animations } from "../../../../effects/Animations";
import { when } from "../../../../match/RemixRule";
import { headingOne, headingTwoParagraphQuoteCodeMath, image, inOrder, or, label } from "../../../../match/Matchers";
import { once } from "../../../../match/expressions/Occurring";
import { tic1Styling } from "../tic1Styling";

/**
 * tic1 v2 - image bottom, text top
 */
export const h1TextImage5050100FullBleedRemix = new Remix('h1textimage-5050100-fullbleed',
  tic1Styling('bottom', 'flex-start !important'),
  when(
    or(
      inOrder(
        image(once),
        headingOne(once),
        headingTwoParagraphQuoteCodeMath(once),
      ),
      inOrder(
        headingOne(once),
        headingTwoParagraphQuoteCodeMath(once),
        image(once),
      )
    )
  ),
  {
    // animation: Animations.imagePan(),
    scalingSelector: ".container:not(.container-image)"
  });

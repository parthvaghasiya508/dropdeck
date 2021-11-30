import { Remix } from "../../../../Remix";
import { Animations } from "../../../../effects/Animations";
import { tic1Styling } from "../tic1Styling";
import { when } from "../../../../match/RemixRule";
import { headingOne, headingTwoParagraph, image, inOrder, label, or } from "../../../../match/Matchers";
import { once } from "../../../../match/expressions/Occurring";

/**
 * Image full bleed, text split and horizontally aligned.
 */
export const imageH1Text1005050FullBleedRemix = new Remix('imageh1text-1005050-fullbleed',
  tic1Styling('top', 'flex-end !important'),
  when(
    or(
      inOrder(
        image(once),
        headingOne(once),
        headingTwoParagraph(once),
      ),
      inOrder(
        headingOne(once),
        headingTwoParagraph(once),
        image(once),
      )
    )
  ),
  {
    // animation: Animations.imagePan(),
    scalingSelector: ".container:not(.container-image)",
    featured: true
  });

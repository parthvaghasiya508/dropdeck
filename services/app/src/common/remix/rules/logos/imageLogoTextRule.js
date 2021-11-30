import { when } from "../../match/RemixRule";
import { allText, image, inOrder, logo, or } from "../../match/Matchers";
import { atLeast, between, exactly } from "../../match/expressions/Occurring";

export const imageLogoTextRule = () => when(
  or(

    // Optional text + logo + text
    inOrder(
      image(between(1, 4)),
      allText(atLeast(0)),
      logo(exactly(1)),
      allText(atLeast(1)),
    ),

    // Text + logo + optional text
    inOrder(
      image(between(1, 4)),
      allText(atLeast(1)),
      logo(exactly(1)),
      allText(atLeast(0)),
    ),
  )
);

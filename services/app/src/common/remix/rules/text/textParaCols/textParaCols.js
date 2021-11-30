//  rt2:   Non-clustered paragraphs in sequence are presented alongside one another: | A | B | C | D | up to a total of four.
//         Note: This remix will match ANY sequence of 2, 3 or 4 paragraphs together.

import { Remix } from "../../../Remix";
import { paragraph, heading } from "../../../match/Matchers";
import { between, anyNumber } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Non-clustered paragraphs in sequence are presented alongside one another: | A | B | C | D | up to a total of four.
 * Positive for lengthy paras.
 */
export const textParaColsRemix = new Remix('text-paracols',
  {
    '& .container': {
      width: '100%',
      overflow: 'hidden',
    },
    '& .container.container-paragraph, & .container.container-code, & .container.container-heading-one, & .container.container-heading-two': {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    '& .container.container-paragraph[data-length="2"], & .container.container-code[data-length="2"], & .container.container-heading-one[data-length="2"], & .container.container-heading-two[data-length="2"]': {
      '& .element': {
        width: '46%',
        boxSizing: 'border-box',
        margin: '0 1.5em 0 0',
        '& *': {
          width: '100%',
        },
      },
    },
  },

  when(
    heading(anyNumber),
    paragraph(between(2, 4)),
  ), {
    scalingSelector: ".container"
  });

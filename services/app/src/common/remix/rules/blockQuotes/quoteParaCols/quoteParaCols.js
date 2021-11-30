import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { quote } from "../../../match/Matchers";
import { between } from "../../../match/expressions/Occurring";

/**
 * Non-clustered quotes in sequence are presented alongside one another:
 *
 *                      | A | B | C | D |
 *
 * up to a total of four.
 */
export const quoteParaColsRemix = new Remix('quote-paracols', {
  '& .container': {
    overflow: 'hidden',
    width: '100%',
    '& h1, & h2, & p': { textAlign: 'center', },
  },
  '& .container.container-block-quote': {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    '& blockquote': {
      padding: '0 1.5em',
      marginRight: '1.5em',
      '& blockquote:last-child': {
        marginRight: '0em',
      },
    },
  },
},
when(quote(between(2, 4))).score(5),{
  scalingSelector: '.container',
});

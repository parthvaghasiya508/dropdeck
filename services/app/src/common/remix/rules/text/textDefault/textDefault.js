import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { heading, paragraph, textList, allText, list, text, label } from "../../../match/Matchers";
import { between, exactly, once, anyNumber } from "../../../match/expressions/Occurring";

const cssTextCentered = {
  '& .container': {
    margin: '0 auto',
    overflow: 'hidden',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
    '&.container-bulleted-list, &.container-numbered-list': {
      width: 'auto',
      maxWidth: '78%',
      '& p': { textAlign: 'left', },
    },
    '& .container + .container-code': { marginTop: '0.3em', },
    '&.container-math': { width: 'auto !important', },
  },
  '& .single-text': {
    overflow: 'hidden',
    width: '100%',
    zIndex: '1',
    '& h1, & h2, & p': {
      marginBottom: '0 !important',
      padding: '0.25em',
    },
    '& li:before': {
      padding: '0.25em 0', // to match padded list item paras
    },
  },
};

/**
 * Text stacks vertically. Center alignment. Boost: 10.
 * Positive for statements and short slide content.
 */
export const textDefaultRemix = new Remix('text-default', cssTextCentered, [

  // Rule to make this remix available to any text on a slide
  when(allText(between(1, 2))).score(1),

  // Rule to match any single text element, remove margins
  when(
    label(textList(exactly(1)), "single-text"),
  ).score(5),

  // Rule to match a heading followed by 1 paragraph:
  when(heading(once), paragraph(once)).score(10),

  // Rule to match a heading followed by 1 list:
  when(heading(once), list(once)).score(10),

  // Rule to match exactly two headings together:
  when(heading(exactly(2))).score(10),

], {
  scalingSelector: '.container, .single-text',
});

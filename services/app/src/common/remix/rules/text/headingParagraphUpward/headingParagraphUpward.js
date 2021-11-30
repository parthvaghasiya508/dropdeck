//  rt3:   Two Column Layout. Builds from bottom upwards. Boost score of 0.05 ensures that safer remixes are surfaced before this one.
import { Remix } from "../../../Remix";
import { heading, label, paragraph } from "../../../match/Matchers";
import { atLeast } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";

/**
 * Two column Layout. Builds from bottom upwards. Boost of 0.05 ensures safer remixes are surfaced before this one.
 */
export const headingParagraphUpwardRemix = new Remix('h1para-5u6u-upward',
  {
    flexDirection: 'row',
    alignItems: 'baseline !important',
    justifyContent: 'space-between !important',

    '& .group-text': {
      overflow: 'hidden', 
      width: '46%',
      textAlign: 'left',
      height: '100%',
      maxHeight: '100%',
      padding: '0.25em',
      '& .container': {
        textAlign: 'left',
        '& H1, & H2, & p': {
          textAlign: 'left',
          margin: '0 0 0.25em 0',
          padding: '0',
        },
      },
    },

    '& .group-para': {
      overflow: 'hidden',
      width: '51%',
      height: '100%',
      maxHeight: '100%',
      padding: '0.25em',
      '& .container-paragraph': {
        '& p': {
          padding: '0',
          margin: '0',
          lineHeight: '1.235',
          width: '100%',
          '&:last-of-type': {
            margin: '0',
          },
        },
      },
      '& .sequence .element': { margin: '1em 0 0 0', },
      '& .sequence .element:first-of-type': { margin: '0', },
    },

  },
  when(
    label(heading(atLeast(1)), "group-text"),
    label(paragraph(atLeast(1)), "group-para"),
  ).score(0.05), {
    scalingSelector: '.group-headings, .group-para',
  });

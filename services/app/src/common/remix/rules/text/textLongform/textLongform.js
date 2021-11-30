import { Remix } from "../../../Remix";
import { headingOne, textList, cluster, text, label, group, or, allText, logo } from "../../../match/Matchers";
import { anyNumber, atLeast, once, exactly } from "../../../match/expressions/Occurring";
import { when } from "../../../match/RemixRule";
import { textDefaultRemix } from "../textDefault/textDefault";

/**
 * Positive for lengthy paras. All text top to bottom, left to right.
 */
export const textLongformRemix = new Remix('text-longform',
  {
    fontSize: '90%',
    justifyContent: 'flex-start !important',
    alignItems: 'flex-start !important',
    '& *': {
      boxSizing: 'border-box'
    },
    '& .container': {
      width: '100%',
      textAlign: 'left',
      overflow: 'hidden',
      '& h1': { 
        margin: '0 0 0.166em 0', 
      },
      '& h2': { 
        margin: '0 0 0.166em 0', 
      },
      '& p': { 
        margin: '0.5em 0', 
      },
      '& .container:last-child *:last-child': { marginBottom: '0', },
    },
    '& .container-logo': {
      '& *': { boxSizing: 'border-box', },
      margin: '1em 0',
      padding: '0',
      width: '50%',
      minHeight: '2.5em',
      '& .element': {
        width: '45%',
        display: 'flex',
        '& .imgWrap img': {
          margin: '0 auto 0 0',
          width: 'auto',
          maxWidth: '100%',
        },
      },
    },
    '& .container-bulleted-list, & .container-numbered-list': {
      '& ul': {
        '& li': {
          '&:before': {
            lineHeight: '1',
          },
        },
      },
    },
    '& .container-logo + .container-heading-one, & .container-logo + .container-heading-two': {
      marginTop: '0.5em',
    },
    '& .container-paragraph + .container-heading-two, & .container-heading-one + .container-heading-one, & .container-heading-two + .container-heading-two, & .container-bulleted-list + .container-heading-one, & .container-numbered-list + .container-heading-one': {
      marginTop: '1em',
    },
    '& .container-paragraph + .container-heading-one': {
      marginTop: '1em',
    },
    '& .sequence': {
      width: '100%',
      '& .cluster': {
        width: '100%',
        '& .container': {
          marginBottom: '0',
        },
        '& .container:last-of-type': {
          marginBottom: '1.5em',
        },
      },
    },

    // Code overflow when slide scaling
    '&.scaling-1, &.scaling-2, &.scaling-3, &.scaling-4, &.scaling-5, &.scaling-6, &.scaling-7, &.scaling-8, &.scaling-9, &.scaling-10, &.scaling-11, &.scaling-12, &.scaling-13, &.scaling-14, &.scaling-15, &.scaling-16, &.scaling-17, &.scaling-18, &.scaling-19, &.scaling-20, &.scaling-max': {
      '& .container-code': {
        '& element': {
          boxSizing: 'border-box',
          position: 'relative',
        },
        '& .codeBlock code': {
          whiteSpace: 'pre !important',
        },
        '&:before': {
          position: 'absolute',
          content: '""',
          top: '1em',
          bottom: '1em',
          right: '1.5em',
          width: '3%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0), #212121)',
          zIndex: '2',
        },
      },
    },

  },[

    // When there are 2+ text blocks, or 2+ clusters of text:
    when(
      group(
        or(
          allText(once),
          cluster(allText(atLeast(1)), once)
        ), atLeast(2)
      )
    ),

    // When there are exactly 2 clusters of text (eg. H1 P H1 P):
    // When there are exactly 3 clusters of text (eg. H1 P H1 P):
    when(cluster(allText(atLeast(1)), exactly(2))).score(20),
    when(cluster(allText(atLeast(1)), exactly(3))).score(20),

    // Included as an option
    when(headingOne(atLeast(1)), allText(atLeast(1))).score(5),

    // Includes Logo
    when(logo(exactly(1)), allText(atLeast(1))).score(8),
    when(allText(atLeast(1)), logo(exactly(1)), allText(anyNumber)).score(8),

  ],
  {
    scalingSelector: '.container',
  }).then(textDefaultRemix);

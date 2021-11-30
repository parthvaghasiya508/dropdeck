import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, plainText, label } from "../../../match/Matchers";
import { anyNumber, atLeast } from "../../../match/expressions/Occurring";

/**
 * Fixed image size clusters - left aligned text - to be scaled back to text only, when content aware image remix is cooked.
 */

export const clustersPanelFixedImageRemix = new Remix('clusters-panels-fixedimg', {
  padding: '5%',
  border: '0px solid #ee9944',
  '& *': { boxSizing: 'border-box', },
  textAlign: 'center',
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  '& .sequence': {
    overflow: 'hidden', // ******************
    padding: '1em',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    margin: '0 auto',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      overflow: 'hidden', // ******************
      margin: '0.5em 2%',
      width: '29%',
      padding: '0.75em 1.25em 0.5em 1.25em',
      background: 'rgba(0,0,0,0.025)',
      borderRadius: '0.25em',
      boxShadow: '0 0.05em 0.075em rgba(0,0,0,.25)',
      // > CONTAINER
      '& .container': {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'center',
        // type
        '&.container-heading-one, &.container-heading-two, &.container-paragraph, &.container-block-quote, &.container-numbered-list, &.container-bulleted-list': {
          width: '100%',
          textAlign: 'left',
          '& H1, & H2, & p': { width: '100%', },
          '& h1': { margin: '0 0 0.166em 0' },
          '& h2': { margin: '0 0 0.166em 0' },
          '& p': { margin: '0.166em 0 0.322em 0', },
          '& ul, & ol': {
            margin: '0 0 0.5em 0',
            '& li': {
              width: 'auto',
              lineHeight: '1',
              '& P': {
                margin: '0 0 0.5em 0',
                textAlign: 'left',
              },
            },
          },
          '& ol': {
            margin: '0 0 0.5em 0.5em',
          },
        },
        // Paragraphs
        '&.container-paragraph': {
          display: 'block',
        },
        // Paragraph + Numbered List
        '&.container-paragraph + .container-numbered-list ol': {
          marginTop: '0.5em',
        },
        // Quotes
        '&.container-block-quote blockquote': {
          marginBottom: '0em',
          '& p': {
            textAlign: 'left',
          },
        },
        // Code
        '&.container-code': {
          textAlign: 'left',
          margin: '1em 0',
          '& *': { textAlign: 'left', },
        },
        // Math
        '&.container-math': {
          '& .katex-display': {
            margin: '0.5em 0',
          },
        },
        // Logos
        '&.container-logo': {
          maxWidth: '100%',
          margin: '0 auto 0.75em auto',
          '& img': {
            width: '60%',
            height: '3.5em',
            margin: '0 auto',
            padding: '2%', // 8%
            boxSizing: 'border-box',
            borderRadius: '0.25em',
          },
        },
        // Images
        '&.container-image': {
          height: '8em',
          margin: '1em 0',
          '& .imgWrap img': {
            objectFit: 'cover',
          },
        },
        // Charts
        '&.container-chart': {
          height: '6em',
          margin: '0.5em 0 1em 0',
        },
        // Last element in cluster
        '&:last-of-type .element > *': {
          marginBottom: '0 !important',
        },
      },
      // Nested Clusters
      '& .cluster': {
        width: 'auto',
        margin: '0',
        padding: '0',
        boxShadow: 'none',
        background: 'transparent',
      },
    },
    // 2 x Cluster specific styling
    '&[data-length="2"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      '& .cluster': {
        width: '46.5%',
        margin: '0',
        '& .container.container-heading-one, & .container.container-heading-two, & .container.container-paragraph': {
          width: '100%',
          textAlign: 'center',
        },
        '& .container.container-heading-one + .container.container-heading-two h2, & .container.container-heading-two + .container.container-heading-one h1': {
          margin: '-0.15em 0 0.35em 0',
        },
        '& .container.container-block-quote blockquote': {
          marginBottom: '0.5em',
          '& p': {
            textAlign: 'center',
          },
        },
      },
    },
    // 3 x Cluster specific styling
    '&[data-length="3"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      '& .cluster': {
        width: '29%',
        margin: '0',
      },
    },
    // 4 x Cluster specific styling
    '&[data-length="4"]': {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      fontSize: '90%',
      '& .cluster': {
        width: '48.25%',
        margin: '0.75em 0',
      },
    },
    // 5 x Cluster specific styling
    '&[data-length="5"]': {
      fontSize: '90%',
    },
    // 6 x Cluster specific styling
    '&[data-length="6"]': {
      fontSize: '90%',
    },
  },

  // If sequence contains cluster(s) with list, left align          * * *
  '& .sequence-cluster-numbered-list, & .sequence-cluster-bulleted-list': {
    '& .cluster': {
      padding: '0.75em 1.25em 0.5em 1.25em',
      '& .container.container-paragraph, & .container.container-heading-one, & .container.container-heading-two': {
        textAlign: 'left',
        '& h1, & h2, & p': {
          textAlign: 'left',
        },
      },
      '& .container.container-block-quote .element': {
        textAlign: 'left',
        '& blockquote': {
          textAlign: 'left',
          '& p': {
            textAlign: 'left !important',
            marginLeft: '0.25em',
          },
        },
      },
    },
  },

  // GROUP TEXT
  '& .group.group-text-before, & .group.group-text-after': {
    overflow: 'hidden',
    width: '100%',
    textAlign: 'center',
    '& .container': {
      width: '100%',
      textAlign: 'center',
    },
  },

},

// Accepts clusters with or without images.
// Scaling for this remix is based on .sequence (to ensure it obeys outer gutter), .cluster (to cater for longer titles)

when(
  label(plainText(anyNumber), "group-text-before"),
  cluster(anyElement(), atLeast(2)),
  label(plainText(anyNumber), "group-text-after"),
), {
  scalingSelector: '.sequence, .sequence > .cluster, .group-text-before, .group-text-after',
});

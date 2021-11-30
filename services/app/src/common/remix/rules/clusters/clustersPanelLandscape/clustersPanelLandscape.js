import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, label, plainText, or, image, inOrder } from "../../../match/Matchers";
import { anyNumber, atLeast, between } from "../../../match/expressions/Occurring";

/**
 * Fixed image size clusters - left aligned text - to be scaled back to text only, when content aware image remix is cooked.
 */

export const clustersPanelLandscapeRemix = new Remix('clusters-panel-landscape', {
  padding: '5%',
  border: '0px solid #ee9944',
  '& *': { boxSizing: 'border-box', },
  textAlign: 'center',
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  '& .sequence': {
    overflow: 'hidden',
    padding: '1em',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    margin: '0 auto',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      overflow: 'hidden',
      margin: '0.5em 2%',
      width: '29%',
      padding: '1em',
      borderRadius: '0.25em',
      boxShadow: '0 0.05em 0.075em rgba(0,0,0,.25)',
      background: 'transparent',
      backdropFilter: 'brightness(1.2) saturate(1.05)',
      position: 'relative',
      // > CONTAINER
      '& .container': {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'center',
        '&:not(.container-image)': {
          paddingLeft: '37.5%',
          '& *': {
            textAlign: 'left',
          },
        },
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
        // Lists
        '&.container-numbered-list ol, &.container-bulleted-list ul': {
          marginTop: '0.5em',
        },
        // Quotes
        '&.container-block-quote blockquote': {
          marginBottom: '0em',
          textAlign: 'left !important',
          '& p': {
            textAlign: 'left !important',
          },
        },
        // Code
        '&.container-code': {
          textAlign: 'left',
          margin: '1em 0 0 37.5%',
          padding: '0 1em 1em 1em',
          width: '63.5%',
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
            padding: '2%',
            boxSizing: 'border-box',
            borderRadius: '0.25em',
          },
        },
        // Images
        '&.container-image': {
          height: '100%',
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          margin: '0',
          padding: '0.5em 0 0.5em 0.5em',
          width: '35%',
          '& .imgWrap img': {
            borderRadius: '0.15em',
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
        width: '48%',
        margin: '0',
        minHeight: '5em',
        '& .container.container-heading-one, & .container.container-heading-two, & .container.container-paragraph': {
          width: '100%',
          textAlign: 'center',
        },
        '& .container.container-heading-one + .container.container-heading-two h2, & .container.container-heading-two + .container.container-heading-one h1': {
          margin: '-0.15em 0 0.35em 0',
        },
        '& .container.container-block-quote blockquote': {
          marginBottom: '0.5em',
        },
      },
    },
    // 3 x Cluster specific styling
    '&[data-length="3"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      '& .cluster': {
        width: '31.5%',
        margin: '0',
      },
    },
    // 4 x Cluster specific styling
    '&[data-length="4"]': {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
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
  '& .group-text-after, & .group-text-before': {
    marginTop: '0.5em',
    width: '100%',
    textAlign: 'center',
    padding: '0 9%',
    '& .container': {
      width: '100%',
      textAlign: 'center',
    },
    '& h1': { marginBottom: '0.25em', },
  },
  '& .group-text-before': {
    marginTop: '0',
    marginBottom: '0.5em',
  },

},

// Should only appear when image present, as is otherwise undifferentiated
when(
  label(plainText(anyNumber), "group-text-before"),
  or(
    cluster(inOrder(anyElement(), image()), between(2,6)),
    cluster(inOrder(image(), anyElement()), between(2,6))
  ),
  label(plainText(anyNumber), "group-text-after"),
).score(14), {
  scalingSelector: '.sequence, .sequence > .cluster, .group-text-before, .group-text-after',
});

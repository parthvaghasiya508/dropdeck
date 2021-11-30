import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, label, plainText } from "../../../match/Matchers";
import { anyNumber, exactly } from "../../../match/expressions/Occurring";

/**
 * Fixed image size clusters - centered text - to be scaled back to text only,
 * when content aware image remix is cooked
 */
export const clustersText5050Remix = new Remix('clusters-text-5050', {
  padding: '5%', //
  '& *': { boxSizing: 'border-box' },
  textAlign: 'left',
  '& .hook': {
    display: 'block',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundImage: 'linear-gradient(90deg,rgba(255,255,255,1),rgba(255,255,255,1) 50%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.7) 100%)',
    opacity: '0.0275',
    zIndex: '0',
  },
  '& .container': {
    width: '100%',
    textAlign: 'left',
    zIndex: '1',
  },
  // SEQUENCE
  '& .sequence': {
    overflow: 'hidden', //
    padding: '1em', //
    margin: '0 auto', //
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      margin: '0.5em 2%',
      width: '50%',
      // > CONTAINER
      '& .container': {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'left',
        // type
        '&.container-heading-one, &.container-heading-two, &.container-paragraph, &.container-block-quote, &.container-numbered-list, &.container-bulleted-list': {
          width: '100%',
          textAlign: 'left',
          '& H1, & H2, & p': { width: '100%', },
          '& h1': { margin: '0 0 0.325em 0', },
          '& h2': { margin: '0 0 0.4em 0', },
          '& p': { margin: '0.166em 0 0.325em 0', },
          '& ul, & ol': {
            margin: '0.5em 0',
            '& li': {
              width: 'auto',
              '& P': { margin: '0 0 0.5em 0', },
            },
          },
        },
        // Paragraphs
        '&.container-paragraph': {
          display: 'block',
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
        // Quotes
        '&.container-block-quote': {
          '& blockquote': {
            marginBottom: '0em',
            width: '100%',
            '& p': {
              textAlign: 'left',
            },
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
        // Last element in cluster
        '&:last-of-type .element > *': {
          marginBottom: '0 !important',
        },
      },
      // Nested Clusters
      '& .cluster': {
        width: 'auto',
        margin: '0',
      },
    },
    // 2 x Cluster specific styling
    '&[data-length="2"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      '& .cluster': {
        width: '40%',
        margin: '0',
        // type
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
  },

  // If sequence contains cluster(s) with list, left align          * * *
  '& .sequence-cluster-numbered-list, .sequence-cluster-bulleted-list': {
    '& .cluster': {
      '& .container.container-paragraph, & .container.container-heading-one, & .container.container-heading-two': {
        textAlign: 'left',
        '& p, & h1, & h2': {
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

},[

  // Accepts clusters with or without images. Only shows when there are exactly 2 Clusters.

  when(cluster(anyElement(), exactly(2))).score(11),
], {
  scalingSelector: '.sequence, .group-text-before, .group-text-after',
});

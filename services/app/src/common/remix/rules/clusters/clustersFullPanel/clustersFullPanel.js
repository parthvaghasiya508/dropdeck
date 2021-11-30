import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, label, plainText } from "../../../match/Matchers";
import { anyNumber, atLeast } from "../../../match/expressions/Occurring";

export const clustersFullPanelRemix = new Remix('clusters-fullpanel', {
  border: '0px solid #00CCFF',
  padding: '0',
  textAlign: 'left',
  '& .deck-logo-container:before': {
    background: '#fff',
  },
  '& *': { boxSizing: 'border-box' },
  // SEQUENCE
  '& .sequence': {
    overflow: 'hidden', //      ********
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    width: '100%',
    margin: '0',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderLeft: '0.05em solid',
    borderColor: '#000',
    // > CLUSTER
    '& .cluster': {
      width: '33.3334%',
      height: '50%',
      margin: '0',
      padding: '2em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start !important',
      justifyContent: 'center',
      textAlign: 'center',
      border: '0.05em solid',
      borderLeftWidth: '0',
      borderColor: '#000',
      position: 'relative',
      '&:last-of-type': { borderRightWidth: '0.05em' },
      // Nested Clusters
      '& .cluster': {
        display: 'contents',
      },
      // > CONTAINER
      '& .container': {
        overflow: 'hidden', //      *********
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'center',
        // Everything except images
        '&:not(.container-image)': {
          zIndex: '2',
          position: 'relative',
          fontSize: '100%',
          '& H1': {
            width: '100%',
            fontSize: '3em',
          },
          '& H1, & H2, & p': {
            width: '100%',
          },
          '& h1, & h2': {
            margin: '0 0 0.166em 0',
          },
          '& p': {
            margin: '0.166em 0 0.322em 0',
          },
          '& ul, & ol': {
            margin: '0 0 0.5em 0',
            '& li': {
              width: 'auto',
              '& P': {
                margin: '0 0 0.5em 0',
                textAlign: 'left',
              },
            },
          },
          '& blockquote': {
            textAlign: 'center',
            width: '100%',
            '& p': {
              paddingLeft: '0.4em',
            },
          },
        },
        // Paragraph + Numbered List
        '&.container-paragraph + .container-numbered-list ol, &.container-paragraph + .container-bulleted-list ul': {
          marginTop: '0.5em',
        },
        // chart
        '&.container-chart': {
          height: '100%',
          margin: '1em 0',
          padding: '1em',
          maxHeight: '10em',
          borderRadius: '0.5em',
          background: 'rgba(255,255,255,0.1)',
          boxSizing: 'border-box',
        },
        // Logos
        '&.container-logo': {
          maxWidth: '60%',
          margin: '1em auto',
          '& img': {
            height: '5em',
            width: '100%',
            padding: '8%',
            boxSizing: 'border-box',
            borderRadius: '0.25em',
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
        // Images
        '&.container-image': {
          margin: '0 !important',
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          height: '100% !important',
          zIndex: '1',
          opacity: '0.6',
          '& .imgWrap img': {
            objectFit: 'cover',
          },
        },
        // H1 + H2 or H2 + H1 together
        '&.container-heading-one + .container.container-heading-two h2, &.container-heading-two + .container.container-heading-one h1': {
          margin: '-0.1em 0 0.5em 0',
        },
      },
    },
    // 2 x cluster
    '&[data-length="2"]': {
      '& .cluster': {
        width: '50%',
        height: '100%',
        '&:last-of-type': {
          width: '50%',
          height: '100%',
        },
      },
    },
    // 3 x cluster
    '&[data-length="3"]': {
      '& .cluster': {
        height: '100%',
        width: '33.3334%',
      },
    },
    // 4 x cluster
    '&[data-length="4"]': {
      '& .cluster': {
        width: '50%',
        '&:nth-of-type(3)': { borderTopWidth: '0' },
        '&:nth-of-type(4)': { borderTopWidth: '0' },
      },
    },
    // 5 x cluster
    '&[data-length="5"]': {
      '& .cluster': {
        width: '33.3334%',
        '&:nth-of-type(1)': { width: '50%' },
        '&:nth-of-type(2)': { width: '50%' },
        '&:nth-of-type(3)': { borderTopWidth: '0' },
        '&:nth-of-type(4)': { borderTopWidth: '0' },
        '&:nth-of-type(5)': { borderTopWidth: '0' },
      },
    },
    // 6 x cluster
    '&[data-length="6"]': {
      '& .cluster': {
        width: '33.3334%',
        '&:nth-of-type(4)': { borderTopWidth: '0' },
        '&:nth-of-type(5)': { borderTopWidth: '0' },
        '&:nth-of-type(6)': { borderTopWidth: '0' },
      },
    },
    // Last element in cluster
    '&:last-of-type .element > *': {
      marginBottom: '0 !important',
    },
  },

  // If sequence contains cluster(s) with list, left align
  '& .sequence-cluster-numbered-list, & .sequence-cluster-bulleted-list': {
    '& .cluster': {
      '& .container.container-paragraph': {
        textAlign: 'left',
        '& p': {
          textAlign: 'left',
        },
      },
      '& .container.container-heading-one, & .container.container-heading-two': {
        textAlign: 'left',
        '& h1, & h2': {
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
      '& .container-bulleted-list': {
        marginLeft: '-1.5em',
        '& ul li': {
          marginLeft: '1em !important',
        },
      },
    },
  },

  // GROUP TEXT
  '& .group-text-before, & .group-text-after': {
    borderColor: '#000',
    border: '0.05em solid',
    width: '100%',
    padding: '4%',
    textAlign: 'center',
    margin: '0',
    '& .container *': {
      width: '100%',
      textAlign: 'center',
    },
    '& .group-text-before, & .group-text-after': {
      display: 'contents',
    },
    '& .sequence': {
      border: '0',
      background: 'none',
    },
    '& h1': {
      marginBottom: '0.125em',
    },
    '& .container:last-of-type *': {
      marginBottom: '0',
    },
  },
  '& .group-text-before': {
    borderBottom: '0',
    marginBottom: '0 !important',
  },
  '& .group-text-after': {
    borderTop: '0',
    marginTop: '0 !important',
  },

},

// Accepts clusters with or without images.
when(
  label(plainText(anyNumber), "group-text-before"),
  cluster(anyElement(), atLeast(2)),
  label(plainText(anyNumber), "group-text-after"),
).score(10), {
  scalingSelector: '.sequence > .cluster > .container:not(.container-image):not(.container-logo), .group-text-before, .group-text-after',
});

import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { cluster, image, anyElement, inOrder, label, or, plainText, quote } from "../../../match/Matchers";
import { anyNumber, atLeast, between } from "../../../match/expressions/Occurring";

/**
 * DEPRECIATED AND REMOVED FROM REMIX FACTORY 
 * DEPRECIATED AND REMOVED FROM REMIX FACTORY 
 * DEPRECIATED AND REMOVED FROM REMIX FACTORY
 */

export const clustersQuoteRoundedImageRemix = new Remix('clusters-quote-roundimg', {
  border: '0px solid #9575cd',
  '& *': { boxSizing: 'border-box', },
  // SEQUENCE
  '& .sequence': {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    margin: '1em 0',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      margin: '0.5em 0',
      width: '29%', // for 6+ clusters
      // Nested Clusters
      '& .cluster': {
        width: 'auto',
        margin: '0',
      },
      // > CONTAINER
      '& .container': {
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'center',
        // Everything except images
        '&:not(.container-image)': {
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
            margin: '0 0 0.322em 0', 
          },          
          '& ul, & ol': {
            margin: '0 0 0.5em 0',
            '& li': {
              width: 'auto',
              '& P': {
                margin: '0 0 0.5em 0',
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
        // Images
        '&.container-image': {
          height: '8em',
          width: '8em',
          margin: '1.5em auto',
          borderRadius: '50%',
          '& .imgWrap img': {
            objectFit: 'cover',
          },
          '& .element': {
            width: '100%',
            height: '100%',
          },
        },

      },
    },

    // 2 x Cluster specific styling
    '&[data-length="2"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      '& .cluster': {
        width: '47.5%',
        margin: '0',
        padding: '0 0.5em',
        '&:not(.container-image)': {
          fontSize: '90%',
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
        padding: '0 1em',
        '&:not(.container-image)': {
          fontSize: '80%',
        },
      },
    },

    // 4 x Cluster specific styling
    '&[data-length="4"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      '& .cluster': {
        width: '23%',
        margin: '0',
        padding: '0 1em',
        '&:not(.container-image)': {
          fontSize: '65%',
        },
      },
    },

    // 5 x Cluster specific styling
    '&[data-length="5"]': {
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& .cluster': {
        width: '33%',
        margin: '1em 0',
        padding: '0 1.5em',
        '&:not(.container-image)': {
          fontSize: '55%',
        },
      },
    },

    // 6 x Cluster specific styling
    '&[data-length="6"]': {
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& .cluster': {
        width: '33%',
        margin: '1em 0',
        padding: '0 1.5em',
        '&:not(.container-image)': {
          fontSize: '55%',
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

  },
},[

  /**
 * DEPRECIATED AND REMOVED FROM REMIX FACTORY 
 * DEPRECIATED AND REMOVED FROM REMIX FACTORY 
 * DEPRECIATED AND REMOVED FROM REMIX FACTORY
 */

  // When cluster contains quote and an image (any order):
  // when(
  //   label(plainText(anyNumber), "group-text-before"),
  //   or(
  //     cluster(inOrder(quote(), image()), between(2,6)),
  //     cluster(inOrder(image(), quote()), between(2,6))
  //   ),
  //   label(plainText(anyNumber), "group-text-after"),
  // ).score(15),

]);

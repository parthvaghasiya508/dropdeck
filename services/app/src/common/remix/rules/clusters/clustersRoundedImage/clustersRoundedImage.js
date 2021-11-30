import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { anyElement, cluster, label, plainText, or, inOrder, image, quote } from "../../../match/Matchers";
import { anyNumber, atLeast, between } from "../../../match/expressions/Occurring";

export const clustersRoundedImageRemix = new Remix('clusters-roundedimg', {
  padding: '5%',
  border: '0px solid #C3FF00',
  textAlign: 'left',
  justifyContent: 'center !important',
  '& *': { boxSizing: 'border-box' },
  '& .container': {
    width: '100%',
    textAlign: 'left',
  },
  // SEQUENCE
  '& .sequence': {
    overflow: 'hidden',
    margin: '0 auto',
    padding: '0 1em',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    '&:last-of-type': { marginBottom: '0', },
    // > CLUSTER
    '& .cluster': {
      overflow: 'hidden',
      border: '0',
      width: '29%',
      margin: '0 2%',
      padding: '0.875em 0.875em 1.25em 0.875em',
      // > CONTAINER
      '& .container': {
        '& *': { textAlign: 'center', },
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
        display: 'flex',
        margin: '0',
        textAlign: 'center',
        // Everything apart from images
        '.container:not(.container-image)': {
          width: '100%',
          textAlign: 'center',
          fontSize: '100%',
        },
        // Standard Text **
        '&.container.container-heading-one, &.container.container-heading-two, , &.container.container-paragraph': {
          '& h1, & h2, & p': {
            width: '100%',
            margin: '0 0 0.4em 0',
          },
        },
        // Paragraph + List
        '&.container-paragraph + .container-numbered-list ol, &.container-paragraph + .container-bulleted-list ul': {
          marginTop: '0.5em',
        },
        // Lists
        '&.container-numbered-list, &.container-bulleted-list': {
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
        },
        // Quotes
        '& .container-block-quote': {
          '& blockquote': {
            textAlign: 'center',
            width: '100% !important',
            marginBottom: '0em',
            '& p': {
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            },
          },
        },
        // Charts
        '&.container-chart': {
          height: '6em',
          margin: '0.5em 0 1em 0',
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
          width: '8em',
          height: '8em',
          margin: '1em auto', // 1.5 auto
          borderRadius: '50%',
          '& .imgWrap img': {
            objectFit: 'cover',
          },
          '& .edit-actions': {
            top: 'unset',
            bottom: 'calc(0% + 9px)',
            left: 'calc(50% - 17px)',
            '& button': {
              width: '34px',            
              height: '34px',
              marginRight: '0',
            },
          },
        },
        // Code
        '&.container-code': {
          margin: '0.5em 0 1em 0',
          textAlign: 'left',
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
      // when first element isn't an image, add additional space at top of cluster
      '& .container:first-child:not(.container-image)': {
        marginTop: '0.875em',
      },
      // when last element IS an image, pull in bottom edge
      '& .container:last-child.container-image': {
        marginBottom: '-0.25em',
      },
      // when non-image element follows image, add space
      '& .container.container-image + .container:not(.container-image)': {
        marginTop: '1.5em',
      },
      // when image follows another element, add space
      '& .container:not(.container-image) + .container.container-image': {
        marginTop: '1.5em',
      },
      // Nested Clusters
      '& .cluster': {
        width: '100%',
        margin: '0',
        padding: '0',
      },
    },
    // 2 x Cluster specific styling
    '&[data-length="2"]': {
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0',
      '& .cluster': {
        width: '48.5%',
        margin: '0',
        // quote
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
      margin: '0',
      '& .cluster': {
        width: '32%',
      },
    },
    // 4 x Cluster specific styling
    '&[data-length="4"]': {
      fontSize: '90%',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      margin: '0',
      '& .cluster': {
        width: '23%',
        margin: '0',
      },
    },
    // 5 + 6 Cluster specific styling
    '&[data-length="5"], &[data-length="6"]': {
      fontSize: '90%',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: '0',
      '& .cluster': {
        width: '30%',
        margin: '0 1%',
      },
    },
  },

  // If sequence contains cluster(s) with list, restyle lists
  '& .sequence-cluster-numbered-list, & .sequence-cluster-bulleted-list': {
    '& .cluster': {
      '& .container.container-bulleted-list': {
        '& li': {
          margin: '2em 0 !important',
          paddingLeft: '0',
          position: 'relative',
          '&:before': {
            margin: '0',
            padding: '0',
            content: '"" !important',
            height: '0.175em',
            minHeight: '0.1em',
            width: '15%',
            left: '42.5%',
            right: '40%',
            top: '-1em',
            borderRadius: '1em',
            position: 'absolute',
            opacity: '0.35',
          },
          '& p': {
            margin: '0',
            padding: '0',
            textAlign: 'center !important',
          },
        },
      },
      '& .container.container-numbered-list': {
        '& li': {
          margin: '2em 0 !important',
          paddingLeft: '0',
          position: 'relative',
          '&:before': {
            content: 'counter(listcounter)',
            width: '1.5em',
            height: '1.5em',
            lineHeight: '1.5',
            left: 'calc(50% + 0.75em)',
            top: '-1.8em',
            position: 'absolute',
            fontWeight: '600',
            zIndex: '1',
            textAlign: 'center',
            fontSize: '0.85em',
          },
          '&:after': {
            margin: '0',
            padding: '0',
            content: '""',
            height: '0.175em',
            minHeight: '0.1em',
            width: '15%',
            left: '42.5%',
            right: '40%',
            top: '-1em',
            borderRadius: '1em',
            position: 'absolute',
            opacity: '0.35',
          },
          '& p': {
            margin: '0',
            padding: '0',
            textAlign: 'center !important',
          },
        },
      },
    },
  },

  // GROUP TEXT
  '& .group-text-after, & .group-text-before': {
    fontSize: '95%',
    marginTop: '0.5em',
    width: '100%',
    textAlign: 'center',
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
},[

  // Match when cluster contains image (any order):
  when(
    label(plainText(anyNumber), "group-text-before"),
    or(
      cluster(inOrder(anyElement(), image()), atLeast(2)),
      cluster(inOrder(image(), anyElement()), atLeast(2))
    ),
    label(plainText(anyNumber), "group-text-after"),
  ).score(14),

  // Boost higher when cluster contains quote:
  when(
    label(plainText(anyNumber), "group-text-before"),
    or(
      cluster(inOrder(quote(), image()), atLeast(2)),
      cluster(inOrder(image(), quote()), atLeast(2)),
      cluster(inOrder(anyElement(), image(), quote()), atLeast(2)),
      cluster(inOrder(anyElement(), quote(), image()), atLeast(2)),
      cluster(inOrder(image(), quote(), anyElement()), atLeast(2)),
      cluster(inOrder(quote(), image(), anyElement()), atLeast(2)),
      cluster(inOrder(image(), anyElement(), quote()), atLeast(2)),
      cluster(inOrder(quote(), anyElement(), image()), atLeast(2)),
    ),
    label(plainText(anyNumber), "group-text-after"),
  ).score(16),

], {
  scalingSelector: '.sequence, .sequence > .cluster, .group-text-before, .group-text-after',
});

//  i12:   4 images, magazine layout. First image 100w. Remaining three 33w right spread.
//  ------------------------------------------------------------------------------

import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { plainText, label, image, inOrder, text } from "../../../match/Matchers";
import { anyNumber, between, exactly } from "../../../match/expressions/Occurring";
import { imageSizeScalingLevels } from "../imageSizeScalingLevels";

/**
 * 3 images, magazine layout. First image 100h/50w. Remaining two 50h/50w right stacked.
 */
export const imagesMagazine4Remix = new Remix('images-4-magazine', {
  // Sets minimum image height, after which the text will scale down. This will vary based on the scaling level.
  ...imageSizeScalingLevels(),
  padding: '6%',
  // Outer Grid
  '& .grid-container': {
    height: 'auto',
    maxHeight: '100%',
    width: '100%',
    boxSizing: 'border-box',
    display: 'grid',
    gridGap: '0',
    overflow: 'hidden',
    // Just images on slide
    '&[data-length="1"]': {
      '& .container-image': {
        padding: '0',
      },
    },
    // All Containers
    '& .container': {
      boxSizing: 'border-box',
      width: '100%',
      textAlign: 'center',
      padding: '0.15em 0',
      '& h1, & h2': {
        margin: '0 !important',
        lineHeight: '1.25',
      },
      '& p': {
        margin: '0 0 0.5em 0 !important',
        lineHeight: '1.25',
      },
    },
    // Blockquote
    '& .container-block-quote': {
      margin: '0',
      padding: '0.45em 0',
      '& blockquote': {
        textAlign: 'center',
      },
    },
    // when text follows image
    '& .container-image + .container:not(.container-image)': {
      paddingTop: '0',
    },
    // when text is last child
    '& .container:last-child.container-paragraph *:last-child p': {
      marginBottom: '0 !important',
    },
    // when first element IS an image, pull in top edge
    '& .container:first-child.container-image': {
      paddingTop: '0',
    },
    // when last element IS an image or logo, pull in bottom edge
    '& .container:last-child.container-image': {
      paddingBottom: '0',
    },
    // Images Only
    '& .container-image': {
      fontSize: '100%',
      padding: '1.25em 0',
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
    // Sequence layouts
    '& .sequence-image': {
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '10% 5%',
      gridTemplateRows: 'minmax(0, 2fr) minmax(0, 1fr)',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
      '& .element': {
        height: 'auto',
        overflow: 'hidden',
        '&:nth-child(1)': {
          gridColumn: '1 / 4',
        },
      },
      '& .imgWrap img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
      '&[data-length="5"]': {
        gridTemplateRows: 'minmax(0, 2fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridColumn: '1 / 5',
        },
      },
      '&[data-length="6"]': {
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridColumn: '1 / 3',
          gridRow: '1 / 3',
        },
        '& .element:nth-child(2)': {
          gridColumn: '1 / 2',
          gridRow: '3 / 4',
        },
        '& .element:nth-child(3)': {
          gridColumn: '2 / 3',
          gridRow: '3 / 4',
        },
        '& .element:nth-child(6)': {
          gridColumn: '3 / 5',
          gridRow: '2 / 4',
        },
      },
      '&[data-length="7"]': {
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridColumn: '1 / 4',
          gridRow: '1 / 4',
        },
        '& .element:nth-child(2)': {
          gridColumn: '4 / 5',
          gridRow: '1 / 2',
        },
      },
      '&[data-length="8"]': {
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridColumn: '1 / 2',
          gridRow: '1 / 2',
        },
      },
      '&[data-length="9"]': {
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridColumn: '1 / 3',
          gridRow: '1 / 3',
        },
        '& .element:nth-child(2)': {
          gridColumn: '1 / 2',
          gridRow: '3 / 4',
        },
        '& .element:nth-child(3)': {
          gridColumn: '2 / 3',
          gridRow: '3 / 4',
        },
      },
      '&[data-length="10"]': {
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridRow: '1 / 4',
          gridColumn: '1 / 7',
        },
        '& .element:nth-child(2)': {
          gridRow: '5 / 4',
          gridColumn: '1 / 4',
        },
        '& .element:nth-child(3)': {
          gridRow: '5 / 4',
          gridColumn: '4 / 7',
        },
        '& .element:nth-child(4)': {
          gridRow: '5 / 6',
          gridColumn: '1 / 4',
        },
        '& .element:nth-child(5)': {
          gridRow: '5 / 6',
          gridColumn: '4 / 7',
        },
        '& .element:nth-child(6)': {
          gridRow: '1 / 2',
          gridColumn: '7 / 10',
        },
        '& .element:nth-child(7)': {
          gridRow: '1 / 2',
          gridColumn: '10 / 13',
        },
        '& .element:nth-child(8)': {
          gridRow: '2 / 3',
          gridColumn: '7 / 10',
        },
        '& .element:nth-child(9)': {
          gridRow: '2 / 3',
          gridColumn: '10 / 13',
        },
        '& .element:nth-child(10)': {
          gridRow: '3 / 6',
          gridColumn: '7 / 13',
        },
      },
      '&[data-length="11"]': {
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridRow: '1 / 5',
          gridColumn: '1 / 7',
        },
        '& .element:nth-child(2)': {
          gridRow: '1 / 3',
          gridColumn: '7 / 10',
        },
        '& .element:nth-child(3)': {
          gridRow: '1 / 3',
          gridColumn: '10 / 13',
        },
        '& .element:nth-child(4)': {
          gridRow: '3 / 5',
          gridColumn: '7 / 10',
        },
        '& .element:nth-child(5)': {
          gridRow: '3 / 5',
          gridColumn: '10 / 13',
        },
        '& .element:nth-child(6)': {
          gridRow: '5 / 6',
          gridColumn: '1 / 3',
        },
        '& .element:nth-child(7)': {
          gridRow: '5 / 6',
          gridColumn: '3 / 5',
        },
        '& .element:nth-child(8)': {
          gridRow: '5 / 6',
          gridColumn: '5 / 7',
        },
        '& .element:nth-child(9)': {
          gridRow: '5 / 6',
          gridColumn: '7 / 9',
        },
        '& .element:nth-child(10)': {
          gridRow: '5 / 6',
          gridColumn: '9 / 11',
        },
        '& .element:nth-child(11)': {
          gridRow: '5 / 6',
          gridColumn: '11 / 13',
        },
      },
      '&[data-length="12"]': {
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        '& .element:nth-child(1)': {
          gridColumn: '1 / 2',
          gridRow: '1 / 2',
        },
      },
    },

  },

},[

  when(
    label(
      inOrder(
        image(between(4,12)),
      ), "grid-container"
    ),
  ).score(15),

  when(
    label(
      inOrder(
        text(anyNumber),
        image(between(4,12)),
        text(anyNumber),
      ), "grid-container"
    ),
  ),

],{
  scalingSelector: ".grid-container"
});

// export const imagesMagazine4Remix = new Remix('images-4-magazine', {
//   border: '4px solid blue',
//   '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
//     width: '100%',
//     textAlign: 'left',
//     '& H1': {
//       margin: '0 0 0.65em 0',
//     },
//     '& H2': {
//       margin: '0 0 0.5em 0',
//     },
//     '& P': {
//       margin: '0 0 0.5em 0',
//     },
//   },
//   '& .group-text-before, & .group-text-after': {
//     width: '100%',
//     fontSize: '85%',
//     '& h1, & h2, & p': {
//       margin: '0 !important',
//       lineHeight: '1.4',
//     },
//     // Margin removed on last element of last container:
//     '& .container:last-child *:last-child': { 
//       margin: '0', 
//     },
//   },
//   '& .group-text-before[data-length="1"], & .group-text-after[data-length="1"]': {
//     '& h1, & h2': {
//       lineHeight: '1',
//     },
//     '& p': {
//       lineHeight: '1.5',
//     },
//   },
  
//   '& .sequence-image': {
//     boxSizing: 'border-box',
//     display: 'grid',
//     gridGap: '10% 5%',
//     gridTemplateRows: 'minmax(0, 2fr) minmax(0, 1fr)',
//     gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//     '& .element': {
//       height: 'auto',
//       overflow: 'hidden',
//       '&:nth-child(1)': {
//         gridColumn: '1 / 4',
//       },
//     },
//     '& .imgWrap img': {
//       height: '100%',
//       width: '100%',
//       objectFit: 'cover',
//     },
//     '&[data-length="5"]': {
//       gridTemplateRows: 'minmax(0, 2fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridColumn: '1 / 5',
//       },
//     },
//     '&[data-length="6"]': {
//       gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridColumn: '1 / 3',
//         gridRow: '1 / 3',
//       },
//       '& .element:nth-child(2)': {
//         gridColumn: '1 / 2',
//         gridRow: '3 / 4',
//       },
//       '& .element:nth-child(3)': {
//         gridColumn: '2 / 3',
//         gridRow: '3 / 4',
//       },
//       '& .element:nth-child(6)': {
//         gridColumn: '3 / 5',
//         gridRow: '2 / 4',
//       },
//     },
//     '&[data-length="7"]': {
//       gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridColumn: '1 / 4',
//         gridRow: '1 / 4',
//       },
//       '& .element:nth-child(2)': {
//         gridColumn: '4 / 5',
//         gridRow: '1 / 2',
//       },
//     },
//     '&[data-length="8"]': {
//       gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridColumn: '1 / 2',
//         gridRow: '1 / 2',
//       },
//     },
//     '&[data-length="9"]': {
//       gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridColumn: '1 / 3',
//         gridRow: '1 / 3',
//       },
//       '& .element:nth-child(2)': {
//         gridColumn: '1 / 2',
//         gridRow: '3 / 4',
//       },
//       '& .element:nth-child(3)': {
//         gridColumn: '2 / 3',
//         gridRow: '3 / 4',
//       },
//     },
//     '&[data-length="10"]': {
//       gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridRow: '1 / 4',
//         gridColumn: '1 / 7',
//       },
//       '& .element:nth-child(2)': {
//         gridRow: '5 / 4',
//         gridColumn: '1 / 4',
//       },
//       '& .element:nth-child(3)': {
//         gridRow: '5 / 4',
//         gridColumn: '4 / 7',
//       },
//       '& .element:nth-child(4)': {
//         gridRow: '5 / 6',
//         gridColumn: '1 / 4',
//       },
//       '& .element:nth-child(5)': {
//         gridRow: '5 / 6',
//         gridColumn: '4 / 7',
//       },
//       '& .element:nth-child(6)': {
//         gridRow: '1 / 2',
//         gridColumn: '7 / 10',
//       },
//       '& .element:nth-child(7)': {
//         gridRow: '1 / 2',
//         gridColumn: '10 / 13',
//       },
//       '& .element:nth-child(8)': {
//         gridRow: '2 / 3',
//         gridColumn: '7 / 10',
//       },
//       '& .element:nth-child(9)': {
//         gridRow: '2 / 3',
//         gridColumn: '10 / 13',
//       },
//       '& .element:nth-child(10)': {
//         gridRow: '3 / 6',
//         gridColumn: '7 / 13',
//       },
//     },
//     '&[data-length="11"]': {
//       gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridRow: '1 / 5',
//         gridColumn: '1 / 7',
//       },
//       '& .element:nth-child(2)': {
//         gridRow: '1 / 3',
//         gridColumn: '7 / 10',
//       },
//       '& .element:nth-child(3)': {
//         gridRow: '1 / 3',
//         gridColumn: '10 / 13',
//       },
//       '& .element:nth-child(4)': {
//         gridRow: '3 / 5',
//         gridColumn: '7 / 10',
//       },
//       '& .element:nth-child(5)': {
//         gridRow: '3 / 5',
//         gridColumn: '10 / 13',
//       },
//       '& .element:nth-child(6)': {
//         gridRow: '5 / 6',
//         gridColumn: '1 / 3',
//       },
//       '& .element:nth-child(7)': {
//         gridRow: '5 / 6',
//         gridColumn: '3 / 5',
//       },
//       '& .element:nth-child(8)': {
//         gridRow: '5 / 6',
//         gridColumn: '5 / 7',
//       },
//       '& .element:nth-child(9)': {
//         gridRow: '5 / 6',
//         gridColumn: '7 / 9',
//       },
//       '& .element:nth-child(10)': {
//         gridRow: '5 / 6',
//         gridColumn: '9 / 11',
//       },
//       '& .element:nth-child(11)': {
//         gridRow: '5 / 6',
//         gridColumn: '11 / 13',
//       },
//     },
//     '&[data-length="12"]': {
//       gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
//       '& .element:nth-child(1)': {
//         gridColumn: '1 / 2',
//         gridRow: '1 / 2',
//       },
//     },
//   },
// },[
//   when(image(between(4, 12))).score(15),
//   when(
//     label(plainText(anyNumber), "group-text-before"),
//     image(between(4, 12)),
//     label(plainText(anyNumber), "group-text-after"),
//   ),
// ]);

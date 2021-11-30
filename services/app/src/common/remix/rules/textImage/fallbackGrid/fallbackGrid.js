//  i12:   4 images, magazine layout. First image 100w. Remaining three 33w right spread.
//  ------------------------------------------------------------------------------
import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { allComponents, label } from "../../../match/Matchers";
import { between } from "../../../match/expressions/Occurring";
import { skipEmptyParagraphs } from "../../../RemixEngine";
import { isLight } from "../../../../../theme/transforms/isLight";
import { darken, lighten } from "../../../../slide/analysis/analyzers/ColorSwatch/ColorUtils";
import { trimContent } from "../../../transforms/trimContent";
import { transformToSlideMarkup } from "../../../../slide/transforms/clustering/clustering";

const MAX_ELEMENTS = 12;
const cssGenerator = (colorChart) => {
  const lightBackground = isLight(colorChart.background());
  return {
    // scroll overflow if needed
    '&.overflow': {
      '& .grid-container': {
        overflow: 'scroll', // currently only working in editor, not player
      },
      '&:after': {
        background: 'linear-gradient(0deg, white 20%, rgba(255,255,255,0) 100%)',
        height: '4em',
        bottom: '0.75%',
      },
    },
    padding: '0.75%',
    '& .grid-container': {
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      boxSizing: 'border-box',
      display: 'grid',
      gridGap: '0.5em',
      // 2 elements
      '&[data-length="2"]': {
        gridTemplateRows: '1fr',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/2',
            gridColumn: '1/2',
          },
          '&:nth-child(2)': {
            gridRow: '1/2',
            gridColumn: '2/3',
          },
        },
        '& .container-logo .element .imgWrap img': {
          maxHeight: '12em !important',
        },
      },
      // 3 elements
      '&[data-length="3"]': {
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/2',
            gridColumn: '1/6',
          },
          '&:nth-child(2)': {
            gridRow: '2/3',
            gridColumn: '1/4',
          },
          '&:nth-child(3)': {
            gridRow: '2/3',
            gridColumn: '4/6',
          },
        },
        '& .container-logo .element .imgWrap img': {
          maxHeight: '10em !important',
        },
      },
      // 4 elements
      '&[data-length="4"]': {
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/2',
            gridColumn: '1/3',
          },
          '&:nth-child(2)': {
            gridRow: '1/2',
            gridColumn: '3/7',
          },
          '&:nth-child(3)': {
            gridRow: '2/3',
            gridColumn: '1/4',
          },
          '&:nth-child(4)': {
            gridRow: '2/3',
            gridColumn: '4/7',
          },
        },
        '& .container-logo .element .imgWrap img': {
          maxHeight: '7.5em !important',
        },
      },
      // 5 elements
      '&[data-length="5"]': {
        gridTemplateRows: 'auto auto auto',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/3',
            gridColumn: '1/3',
          },
          '&:nth-child(2)': {
            gridRow: '1/2',
            gridColumn: '3/7',
          },
          '&:nth-child(3)': {
            gridRow: '2/3',
            gridColumn: '3/7',
          },
          '&:nth-child(4)': {
            gridRow: '3/4',
            gridColumn: '1/3',
          },
          '&:nth-child(5)': {
            gridRow: '3/4',
            gridColumn: '3/7',
          },
        },
        '& .container-logo .element .imgWrap img': {
          maxHeight: '7.5em !important',
        },
      },
      // 6 elements
      '&[data-length="6"]': {
        gridTemplateRows: 'auto auto auto',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/3',
            gridColumn: '1/3',
          },
          '&:nth-child(2)': {
            gridRow: '1/2',
            gridColumn: '3/7',
          },
          '&:nth-child(3)': {
            gridRow: '2/3',
            gridColumn: '3/7',
          },
          '&:nth-child(4)': {
            gridRow: '3/4',
            gridColumn: '1/3',
          },
          '&:nth-child(5)': {
            gridRow: '3/4',
            gridColumn: '3/5',
          },
          '&:nth-child(6)': {
            gridRow: '3/4',
            gridColumn: '5/7',
          },
        },
      },
      // 7 elements
      '&[data-length="7"]': {
        gridTemplateRows: 'auto auto auto',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/2',
            gridColumn: '1/4',
          },
          '&:nth-child(2)': {
            gridRow: '1/2',
            gridColumn: '4/7',
          },
          '&:nth-child(3)': {
            gridRow: '2/4',
            gridColumn: '1/3',
          },
          '&:nth-child(4)': {
            gridRow: '2/3',
            gridColumn: '3/5',
          },
          '&:nth-child(5)': {
            gridRow: '2/3',
            gridColumn: '5/7',
          },
          '&:nth-child(6)': {
            gridRow: '3/4',
            gridColumn: '3/5',
          },
          '&:nth-child(7)': {
            gridRow: '3/4',
            gridColumn: '5/7',
          },
        },
      },
      // 8 elements
      '&[data-length="8"]': {
        gridTemplateRows: 'auto auto auto auto',
        gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/3',
            gridColumn: '1/3',
          },
          '&:nth-child(2)': {
            gridRow: '1/2',
            gridColumn: '3/7',
          },
          '&:nth-child(3)': {
            gridRow: '2/3',
            gridColumn: '3/5',
          },
          '&:nth-child(4)': {
            gridRow: '2/3',
            gridColumn: '5/7',
          },

          '&:nth-child(5)': {
            gridRow: '3/4',
            gridColumn: '1/3',
          },
          '&:nth-child(6)': {
            gridRow: '3/4',
            gridColumn: '3/5',
          },
          '&:nth-child(7)': {
            gridRow: '4/5',
            gridColumn: '1/5',
          },
          '&:nth-child(8)': {
            gridRow: '3/5',
            gridColumn: '5/7',
          },

        },
      },
      // 9 elements
      '&[data-length="9"]': {
        gridTemplateRows: 'auto auto auto',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/3',
            gridColumn: '1/3',
          },
        },
      },
      // 10 elements
      '&[data-length="10"]': {
        gridTemplateRows: 'auto auto auto auto',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/3',
            gridColumn: '1/3',
          },
          '&:nth-child(10)': {
            gridRow: '-1/-3',
            gridColumn: '-1/-3',
          },
        },
      },
      // 11 elements
      '&[data-length="11"]': {
        gridTemplateRows: 'auto auto auto',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        '& .container': {
          '&:nth-child(1)': {
            gridRow: '1/3',
            gridColumn: '1/2',
          },
        },
      },
      // 12 elements
      '&[data-length="12"]': {
        gridTemplateRows: 'auto auto auto',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      },
      // Component Specific Styles
      // -------------------------
      '& .container': {
        background: lightBackground ? darken(colorChart.background(), 0.2) : lighten(colorChart.background(), 0.2),
        border: lightBackground ? `0.025em solid ${darken(colorChart.background(), 0.5)}` : `0.025em solid ${lighten(colorChart.background(), 0.5)}`,
        padding: '1.5em',
        display: 'flex',
        margin: '0',
        height: 'auto',
        minHeight: 'auto',
        maxHeight: 'auto',
        boxSizing: 'border-box',
        width: '100%',
        '& .element': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        },
        // H1
        '&.container-heading-one': {
          justifyContent: 'flex-start',
        },
        // Quote
        '&.container-block-quote': {
          paddingLeft: '3em',
          '& blockquote:before': {
            background: 'transparent !important',
          },
          '& p': {
            borderLeft: '0 !important',
          },
        },
        // List
        '&.container-bulleted-list, &.container-numbered-list': {
          '& li': {
            width: 'auto',
          },
        },
        // Code
        '&.container-code': {
          minHeight: '2.25em',
          padding: '0.05em 1.5em',
          background: '#202020e7',
        },
        // Chart
        '&.container-chart': {
          border: '0.025em solid rgba(0,0,0,0.075)',
          minHeight: '9em',
        },
        // Table
        '&.container-table': {
          padding: '0.5em',
        },
        // Video
        '&.container-video': {
          minHeight: '9em',
          padding: '0',
          background: '#202020',
          position: 'relative',
        },
        // Image
        '&.container-image': {
          border: '0',
          minHeight: '4.5em',
          padding: '0 !important',
          '& .imgWrap img': {
            objectFit: 'cover',
          },
        },
        // Logo Standalone
        '&.container-logo': {
          background: '#fff',
          border: '0.025em solid rgba(0,0,0,0.075)',
          alignItems: 'stretch',
          padding: '0',
          '& .element': {
            height: 'auto !important',
            alignItems: 'center',
            '& .imgWrap': {
              alignItems: 'center',
              justifyContent: 'center',
              '&.opaqueBg': {
                borderRadius: 'unset',
                padding: 'unset',
              },
              '& img': {
                maxWidth: '50%',
                maxHeight: '5em !important',
                height: 'auto',
              },
            },
          },
        },
        // Logo Gallery
        '&.container-logo-list': {
          width: '100%',
          background: '#fff',
          border: '0.025em solid rgba(0,0,0,0.075)',
          '&  .element .logos': {
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            '& .imgWrap': {
              maxHeight: '3.5em !important',
              alignItems: 'center',
              flex: '0 0 25%',
              '& img': {
                maxHeight: '3.5em !important',
                maxWidth: '50%',
              },
            },
          }
        },
        '& h1, & h2, & p, & ol, & ul': {
          marginBottom: '0',
        },
      },
      // Scaling
      '& .container:not(.container-image), & .container:not(.container-logo)': {
        overflow: 'hidden',
      },
    },
    '& .container-heading-one, & .container-heading-two, & .container-paragraph': {
      width: '100%',
      textAlign: 'left',
    },
    '& span.emphasis': {
      padding: '0',
    },
  };
};

export const fallbackGridRemix = new Remix('fallbackGrid', cssGenerator,[
  when(
    label(allComponents(between(2, MAX_ELEMENTS)), "grid-container"),
  ).score(0.01),
], {

  // Custom transformation: no sequencing and no clustering.
  transform: (nodes) => trimContent(transformToSlideMarkup(nodes, skipEmptyParagraphs), MAX_ELEMENTS),

  // Allow every component to be swapped with any other element in this remix.
  equivalence: (sourceType, targetType) => true,
  scalingSelector: ".grid-container > .container:not(.container-image)"
});

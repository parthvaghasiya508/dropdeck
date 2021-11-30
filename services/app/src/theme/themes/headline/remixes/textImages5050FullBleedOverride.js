export const textImages5050FullBleedOverride = (palette) => ({
  border: '0px solid goldenrod',
  justifyContent: 'flex-start',
  '& .container': {
    '& .container': { width: '100% !important' },
  },
  '& .container.container-image': {
    '& .element': {
      borderColor: `${palette.background()} !important`,
    },
    // 2
    '&[data-length="2"]': {
      border: '0',
      '& .element': {
        '&:nth-of-type(1)': {
          border: '0 solid',
          borderBottom: '0.2em solid',
        },
        '&:nth-of-type(2)': {
          border: '0.2em solid',
          borderBottom: '0',
          borderLeft: '0',
          borderRight: '0',
        },
      },
    },
    // 3
    '&[data-length="3"]': {
      border: '0',
      '& .element': {
        '&:nth-of-type(1)': {
          border: '0 solid',
          borderBottom: '0.2em solid',
        },
        '&:nth-of-type(2)': {
          border: '0 solid',
          borderBottom: '0.2em solid',
          borderTop: '0.2em solid',
        },
        '&:nth-of-type(3)': {
          border: '0 solid',
          borderTop: '0.2em solid',
        },
      },
    },
    // 4
    '&[data-length="4"]': {
      border: '0',
      '& .element': {
        '&:nth-of-type(1)': {
          border: '0 solid',
          borderRight: '0em solid',
          borderBottom: '0.2em solid',
        },
        '&:nth-of-type(2)': {
          border: '0 solid',
          borderLeft: '0.4em solid',
          borderBottom: '0.2em solid',
        },
        '&:nth-of-type(3)': {
          border: '0 solid',
          borderRight: '0em solid',
          borderTop: '0.2em solid',
        },
        '&:nth-of-type(4)': {
          border: '0 solid',
          borderLeft: '0.4em solid',
          borderTop: '0.2em solid',
        },
      },
    },
    // 5
    '&[data-length="5"]': {
      border: '0',
      '& .element': {
        boxSizing: 'border-box',
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(3)': {
          borderBottom: '0',
        },
        '&:nth-of-type(4)': {
          borderBottom: '0',
        },
        '&:nth-of-type(5)': {
          borderBottom: '0',
          borderRight: '0',
        },
      },
    },
    // 6
    '&[data-length="6"]': {
      border: '0',
      '& .element': {
        boxSizing: 'border-box',
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderBottom: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          border: '0',
        },
        '&:nth-of-type(6)': {
          borderTop: '0',
          borderBottom: '0',
          borderRight: '0',
        },
      },
    },
    // 7
    '&[data-length="7"]': {
      border: '0',
      '& .element': {
        boxSizing: 'border-box',
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          border: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderRight: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(4)': {
          borderRight: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderRight: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(7)': {
          borderRight: '0',
          borderBottom: '0',
        },
      },
    },
    // 8
    '&[data-length="8"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(2)': {
          borderRight: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(3), &:nth-of-type(5), &:nth-of-type(7)': {
          borderLeft: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(4), &:nth-of-type(6), &:nth-of-type(8)': {
          borderRight: '0',
          borderBottom: '0',
        },
      },
    },
    // 9
    '&[data-length="9"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(9)': {
          border: '0',
        },
      },
    },
    // 10
    '&[data-length="10"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(9)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(10)': {
          border: '0',
        },
      },
    },
    // 11
    '&[data-length="11"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(9)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(10)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(11)': {
          border: '0',
        },
      },
    },
    // 12
    '&[data-length="12"]': {
      border: '0',
      '& .element': {
        border: '0.2em solid',
        boxSizing: 'border-box',
        '&:nth-of-type(1)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(2)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(3)': {
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(4)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(5)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(6)': {
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(7)': {
          borderLeft: '0',
          borderTop: '0',
        },
        '&:nth-of-type(8)': {
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(9)': {
          borderRight: '0',
          borderTop: '0',
        },
        '&:nth-of-type(10)': {
          borderLeft: '0',
          borderTop: '0',
          borderBottom: '0',
        },
        '&:nth-of-type(11)': {
          border: '0',
        },
        '&:nth-of-type(12)': {
          borderRight: '0',
          borderTop: '0',
          borderBottom: '0',
        },
      },
    },
  },
  '& .container-heading-one': {
    marginBottom: 'auto',
  },
  '& .container-paragraph + .container-heading-one, & .container-heading-two + .container-heading-one': {
    marginBottom: '0',
    marginTop: 'auto',
  },
  '& .container.container-block-quote': {
    padding: '0.2em 0.5em 0.2em 0',
    boxSizing: 'border-box',
    '& blockquote': {
      paddingLeft: '0 !important',
      '& p': {
        textIndent: '0.65em !important',
        padding: '0.1em 0 0.1em 1em',
        borderLeftWidth: '0.0075em !important',
      },
    },
  },
  '& .group.img-text': {
    top: '9% !important',
    '& .container.container-image': {
      maxHeight: '12em !important',
      gridGap: '0.25em !important',
    },
  },
});

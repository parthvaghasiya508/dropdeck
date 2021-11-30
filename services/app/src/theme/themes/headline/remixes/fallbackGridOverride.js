export const fallbackGridOverride = (palette) => ({
  '& .grid-container': {
    gridGap: '0.5em',
    '& .container': {
      backdropFilter: 'saturate(1.2)',
      borderRadius: '0',
      padding: '1.5em',
      alignItems: 'center',
      justifyContent: 'center',
      '&.container-heading-one': {
        justifyContent: 'flex-start',
        '& h1': {
          fontSize: '3.25em',
          lineHeight: '1',
        },
      },
      '&.container-heading-two': {
        justifyContent: 'flex-start',
      },
      '&.container-block-quote p': {
        textIndent: '0',
      },
      '&.container-logo': {
        border: '0.025em solid rgba(0,0,0,0.1)',
      },
      '&.container-block-quote blockquote': {
        '&:before': {
          top: '0',
        },
      },

    },
  },
});

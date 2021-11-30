export const imageFullBleedTextGradientOverride = () => ({
  
  '& .container.container-heading-one': {
    marginTop: 'auto',
    '& h1': {
      fontSize: '6em',
      marginBottom: '0.2em',
    },
  },

  '& .container.container-block-quote': {
    padding: '0.2em 0.5em 0.2em 0',
    boxSizing: 'border-box',
    '& blockquote': {
      paddingLeft: '0 !important',
      '&:before': { display: 'none' },
      '&:after': { display: 'none', },
      '& p': {
        textIndent: '0.65em !important',
        padding: '0.1em 0 0.1em 1em',
        borderLeftWidth: '0.0075em !important',
        '&:before, &:after': {
          top: '0.15em',
          margin: '0.4em 0 0 -0.85em',
          content: "“",
          opacity: '0.75',
          position: 'absolute',
          fontSize: '1.6em',
          lineHeight: '0',
          display: 'inline',
          fontStyle: 'normal',
        },
        '&:after': {
          content: "”",
          margin: '0 0 0 0.05em',
          position: 'relative',
        },
      },
    },
  },

  '& .container.container-logo': {
    marginLeft: '0',      
    '& .element': {
      marginLeft: '0',      
    },
  },

});

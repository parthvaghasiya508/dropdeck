export const quoteSimpleImageOverride = (palette) => ({

  justifyContent: 'center !important',
  '& .container-paragraph': {
    margin: '0',
    width: '85%',
    textAlign: 'center',
    '& p': {
      '&:before': {
        display: 'none',
      },
    },
  },
  '& .container-block-quote': {
    width: '95%',
    '& blockquote': {
      position: 'relative',
      paddingTop: '2em',
      paddingBottom: '0.25em',
      '&:before': {
        fontFamily: 'Arial, sans-serif',
        color: `${palette.text()} !important`,
        background: `${palette.background()} !important`,
        content: '"“"',
        display: 'block',
        position: 'absolute',
        transform: 'scale(4)',
        left: 'calc(50% - 0.5em)',
        height: '0.4em',
        width: '0.4em',
        borderRadius: '5em',
        zIndex: '3',
        lineHeight: '1.1',
        textAlign: 'center',
        padding: '0.2em',
        top: '0',
      },
      '&:after': {
        borderTop: '0.1em solid',
        borderTopColor: `${palette.text()} !important`,
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '35%',
        right: '35%',
        height: '0',
        zIndex: '2',
        lineHeight: '1',
        opacity: '0.2',
        top: '0.45em',
      },
      '& p': {
        marginBottom: '0',
        fontSize: '1.6em',
        lineHeight: '1.25',
        padding: '0',
        '&:before, &:after': {
          fontSize: '1.25em',
          verticalAlign: 'middle',
        },
      },

    },
  },
  
});

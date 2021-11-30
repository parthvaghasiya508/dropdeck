export const quoteSimpleImageOverride = (palette) => ({

  justifyContent: 'center !important',
  '& .container-paragraph': {
    margin: '0',
    width: '75%',
    textAlign: 'center',
    '& p': {
      '&:before': {
        display: 'none',
      },
    },
  },
  
  '& .container-block-quote': {
    '& blockquote': {
      position: 'relative',
      paddingTop: '2em',
      paddingBottom: '0.5em',
      paddingLeft: '2.25em',
      // "
      '&:before': {
        color: `${palette.text()} !important`,
        background: `${palette.background()} !important`,
        content: '"“"',
        display: 'block',
        position: 'absolute',
        transform: 'scale(4)',
        left: 'calc(50% - 0.5em)',
        height: '0.5em',
        width: '0.5em',
        borderRadius: '5em',
        zIndex: '3',
        lineHeight: '1.25',
        textAlign: 'center',
        padding: '0.2em',
        top: '0',
      },
      // line behind
      '&:after': {
        borderTopColor: `${palette.text()} !important`,
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '35%',
        right: '35%',
        height: '0',
        borderTop: '0.1em solid',
        zIndex: '2',
        lineHeight: '1',
        opacity: '0.2',
        top: '0.5em',
      },
      '& p': {
        marginBottom: '0',
        fontSize: '1.6em !important',
        padding: '0',
        '&:before, &:after': {
          fontSize: '1.6em',
          verticalAlign: 'middle',
        },
      },
    },  
  },

  '& p': {
    borderLeftWidth: '0 !important',
  },
  '& .container-image': {
    width: 'auto',
    height: 'auto',
    '& .element': {
      width: '5em',
      height: '5em',
    },
  },
});

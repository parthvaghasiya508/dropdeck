export const textQuote5050FullBleedOverride = (palette) => ({
  '& blockquote': {
    '&:before': {
      color: `${palette.text()} !important`,
      background: `${palette.background()} !important`,
    },
    '&:after': {
      borderTopColor: `${palette.text()} !important`,
    },
  },
  '& .img-quote': {
    margin: 'auto 0',
    width: '48%',
    '& blockquote': {
      position: 'relative',
      padding: '2em 0 0 0',
      '&:before': {
        content: '"“"',
        display: 'block',
        position: 'absolute',
        transform: 'scale(4)',
        left: 'calc(50% - 0.5em)',
        height: '0.5em',
        width: '0.5em',
        borderRadius: '5em',
        zIndex: '3',
        lineHeight: '1.1',
        textAlign: 'center',
        padding: '0.2em',
        top: '1.65em',
      },
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '30%',
        right: '30%',
        height: '0',
        borderTop: '0.1em solid',
        zIndex: '2',
        lineHeight: '1',
        opacity: '0.2',
        top: '2em',
      },
      '& p': {
        fontSize: '1.6em !important',
      },
    },
    '& p': {
      margin: '1em 0 0 0',
      padding: '0',
      borderLeftWidth: '0 !important',
    },
  },
});

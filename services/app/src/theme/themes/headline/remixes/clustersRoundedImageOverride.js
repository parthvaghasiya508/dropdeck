export const clustersRoundedImageOverride = (palette) => ({
  '& .container-block-quote': {
    '& blockquote': {
      position: 'relative',
      marginTop: '1em',
      paddingTop: '2em',
      paddingBottom: '0.5em',
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
        lineHeight: '1.25',
        textAlign: 'center',
        padding: '0.2em',
        top: '0',
      },
      '&:after': {
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
        top: '0.45em',
      },
      '& p': {
        borderLeft: '0 !important',
        marginBottom: '0',
        padding: '0',
        fontSize: '1.4em !important',
        textAlign: 'center',
      },
    },
    '& + .container-paragraph p': {
      textAlign: 'center',
    },
  },
});

export const olBoldNumberOverride = (palette) => ({
  '& ol': {
    borderBottom: `0.005em solid ${palette.text()}44 !important`,
    '& li': {
      borderTop: `0.005em solid ${palette.text()}44 !important`,
      '&:before': {
        color: palette.titleColor,
      },
      '& P': {
        color: palette.titleColor,
      },
    },
  },

  '& .group-text-before': {
    marginBottom: 'auto',
    fontSize: '100%',
  },
  '& .group-text-after': {
    marginTop: 'auto',
    fontSize: '100%',
  },
  
  '& li': {
    flexDirection: 'row-reverse',
    margin: '0 !important',
    '&:before': {
      fontWeight: '900 !important',
      minWidth: 'auto !important',
      textAlign: 'right',
      fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif !important',
      opacity: '0.5',
      fontSize: '1.4em !important',
      paddingRight: '0.125em',
    },
    '& p': {
      fontSize: '1.4em !important',
      fontWeight: '900 !important',
      fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif !important',
      width: 'inherit',
      textTransform: 'uppercase',
      '& span.emphasis': {
        padding: '0',
      },
    },
  },

});

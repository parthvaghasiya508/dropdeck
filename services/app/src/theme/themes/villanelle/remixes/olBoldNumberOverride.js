export const olBoldNumberOverride = (palette) => ({
  '& ol': {
    borderBottom: `0.005em solid ${palette.text()}44 !important`,
    '& li': {
      borderTop: `0.005em solid ${palette.text()}44 !important`,
      '&:before': {
        color: palette.titleColor,
        height: '100%',
        fontFamily: '"IBM Plex Sans Condensed", sans-serif !important',
        fontWeight: '600 !important',
        fontSize: '1.1em !important',
        transform: 'scale(1,0.9)',
        minWidth: '2em !important',
      },
      '& P': {
        color: palette.titleColor,
      },
    },
  },

  '& .group-text-before': {
    marginBottom: '2em',
  },
  '& .group-text-after': {
    marginTop: '2em',
  },
  '& .container.container-numbered-list ol li': {
    margin: '0 !important',
    padding: '0.65em 0 !important',
    '&:before': {
      fontWeight: '600 !important',
      opacity: '0.5',
      minWidth: '2em',
    },
    '& p': {
      fontWeight: '600 !important',
    },
  },
});

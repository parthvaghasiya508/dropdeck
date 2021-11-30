export const olBoldNumberOverride = (palette) => ({
  '& ol': {
    borderBottom: `0.005em solid ${palette.accent()}44 !important`,
    '& li': {
      borderTop: `0.005em solid ${palette.accent()}44 !important`,
      '&:before': {
        color: palette.titleColor,
        height: '100%',
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
      opacity: '1',
      minWidth: '2em',
      color: palette.accentColor,
    },
    '& p': {
      fontWeight: '600 !important',
    },
  },
});

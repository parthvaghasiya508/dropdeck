export const olBoldNumberOverride = (palette) => ({
  '& ol': {
    borderBottom: `0.005em solid ${palette.text()}44 !important`,
    '& li': {
      borderTop: `0.005em solid ${palette.text()}44 !important`,
      '&:before': {
        fontFamily: '"Work Sans", sans-serif !important',
        fontWeight: '500 !important',
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
      opacity: '0.5',
      minWidth: '2em',
    },
    '& p': {
      fontWeight: '600 !important',
    },
  },
});

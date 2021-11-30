export const olBoldNumberOverride = (palette) => ({
  '& ol': {
    borderBottom: `0.005em solid ${palette.text()}44 !important`,
    '& li': {
      borderTop: `0.005em solid ${palette.text()}44 !important`,
      '& P': {
        color: palette.titleColor,
      },
    },
  },
  '& .container-numbered-list': {
    '& ol': {
      border: '0 !important',
      '& li': {
        border: '0 !important',
        padding: '0.25em 0',
        marginLeft: '0 !important',
        '&:before': {
          background: `${palette.accent()}`,
          color: `${palette.background()}`,
          fontFamily: '"Source Serif Pro", sans-serif !important',
          margin: '0.1em 0.75em 0 0',
          fontSize: '0.85em',
          fontWeight: '600',
          lineHeight: '1.75',
          textAlign: 'center',
          borderRadius: '50%',
          minWidth: '1.65em',
          height: '1.65em',
          content: '"" counter(list-counter)',
        },
      },
    },
  },
});

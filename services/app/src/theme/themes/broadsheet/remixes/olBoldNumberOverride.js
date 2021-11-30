// BigNumberList Border Colour
export const olBoldNumberOverride = (palette) => ({
  '& ol': {
    borderWidth: '0 !important',
    padding: '0 0 0.17em 0 !important',
    '& li': {
      margin: '0 !important',

      boxShadow: `inset 0 0.03em 0 ${palette.accent()}, inset 0 0.14em 0 ${palette.background()}, inset 0 0.17em 0 ${palette.accent()}`,
      padding: '0.42em 0 0.25em 0 !important',
      borderWidth: '0 !important',
      '&:before': {
        fontFamily: '"Assistant", sans-serif !important',
        fontWeight: '600 !important',
      },
    },
    boxShadow: `inset 0 -0.03em 0 ${palette.accent()}, inset 0 -0.14em 0 ${palette.background()}, inset 0 -0.17em 0 ${palette.accent()}`,
  },
});

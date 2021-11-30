// fullbleed fade
export const imageFullBleedTextGradientOverride = (palette) => ({
  '& .container-paragraph, & .container li, ': {
    '& p': {
      fontWeight: "500",
    },
  },
  '& .container-heading-one + .container-block-quote': {
    margin: '-0.35em 0',
  },

  '& .container-block-quote p': {
    textIndent: '0.55em',
    '&:before': {
      marginLeft: '-0.725em',
    },
  },

});

// fullbleed fade
export const imageFullBleedTextGradientOverride = (palette) => ({
  '& .container-heading-one': {
    '& h1': {
      margin: '0 0 0.35em 0',
      lineHeight: '1.1 !important',
    },
  },
  '& .container-heading-two': {
    '& h2': {
      fontWeight: "600",
    },
  },
  '& .container-paragraph, & .container li, ': {
    '& p': {
      fontWeight: "500",
    },
  },

  '& .container-heading-one + .container-block-quote': {
    margin: '-0.35em 0',
  },

  '& .container-block-quote p': {
    textIndent: '0.65em !important',
    '&:before': {
      marginLeft: '-0.85em !important',
    },
  },

});

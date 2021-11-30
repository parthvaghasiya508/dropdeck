// border on quote image
export const quoteSimpleImageOverride = () => ({
  '& img': {
    boxSizing: 'border-box',
    border: '0.1em solid white',
  },

  '& .container-block-quote': {
    width: '100%',
    '& blockquote': {
      position: 'relative',
      padding: '0.25em',
      '& p': {
        marginBottom: '0',
        fontSize: '1.6em',
        lineHeight: '1.25',
        padding: '0',
        '&:before, &:after': {
          fontSize: '1.25em',
          fontWeight: '500',
          marginTop: '0.15em',
        },
      },
    },
  },

});

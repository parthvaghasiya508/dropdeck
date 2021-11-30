export const textBlockbusterOverride = () => ({
  justifyContent: 'space-between !important',
  lineHeight: '0.9',
  textAlign: 'left',

  '& .container.container-heading-one': {
    marginTop: 'auto !important',
    '& h1': {
      fontSize: '6em',
      marginBottom: '0.35em',
      textAlign: 'left !important',
    },
  },

  '& .container-heading-two, & .container-paragraph, & .container-block-quote': {
    textAlign: 'left',
    '& h2, & p, & blockquote': {
      textAlign: 'left'
    },
  },

  '& .container-heading-one + .container-heading-two, & .container-heading-one + .container-paragraph': {
    marginTop: '0.75em'
  },

  '& .container-block-quote': {
    marginTop: '1.5em !important',
    '& p': {
      fontSize: '1.5em !important',
    },
  },

  '& .container.container-logo': {
    marginLeft: '0',
    '& .element': {
      marginLeft: '0',
    },
  },

});

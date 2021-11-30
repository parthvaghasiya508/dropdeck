// blockbuster

export const textBlockbusterOverride = () => ({
  '& .container *': {
    textAlign: 'left !important',
  },
  '& .container.container-heading-one h1': {
    margin: '0 0 0.35em 0',
    lineHeight: '1.1 !important',
  },
  '& .container.container-heading-one + .container.container-heading-two h2': {
    marginTop: '0',
  },
  '& .container.container-heading-two h2': {
    marginBottom: '0.5em',
  },
  '& .container.container-logo': {
    margin: '0 auto 1.5em 0',
    '& .element': {
      margin: '0 auto 0 0',
      '& .imgWrap img': {
        margin: '0 auto 0 0',
      },
    },
  },
  '& .container.container-block-quote blockquote p': {
    lineHeight: '1.25',
    width: '95%',
    marginLeft: '0',
    marginRight: 'auto',
    '&:before, &:after': {
      margin: '0 0.075em 0 0',
      position: 'relative',
    },
    '&:after': {
      margin: '0 0 0 0.05em',
    },
  },
  '& .container.container-heading-one + .container.container-block-quote': {
    marginTop: '0',
  },

});

// blockbuster

export const textBlockbusterOverride = () => ({
  '& .container.container-heading-one h1': {
    margin: '0 0 0.35em 0',
    lineHeight: '1.05',
  },
  '& .container.container-heading-one + .container.container-heading-two h2': {
    marginTop: '0',
  },
  '& .container.container-heading-two h2': {
    marginBottom: '1.25em',
  },
  '& .container.container-block-quote blockquote p': {
    lineHeight: '1.25',
    width: '95%',
    marginLeft: 'auto',
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

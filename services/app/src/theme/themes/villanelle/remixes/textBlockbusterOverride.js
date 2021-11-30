// blockbuster
export const textBlockbusterOverride = () => ({
  '& .container-heading-one': {
    '& h1': {
      marginBottom: '0.35em !important',
      fontSize: '6em !important',
    },
  },
  '& .container-heading-one + .container-heading-two h2': {
    marginTop: '0.25em !important',
  },
  '& .container.container-block-quote blockquote p': {
    '&:before, &:after': {
      margin: '0 0.075em 0 0',
      position: 'relative',
    },
    '&:after': {
      margin: '0 0 0 0.05em',
    },
  },
});

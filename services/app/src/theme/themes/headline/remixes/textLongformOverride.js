export const textLongformOverride = () => ({
  '& .container': {
    width: '85%',
    '& .container': {
      width: '100%',
    },
  },
  '& .container-heading-one': {
    marginTop: '0',
    marginBottom: '0',
    width: '85%',
  },
  '& .container-block-quote blockquote': {
    '& p': {
      fontSize: '1.75em !important',
    },
  },
  '& .cluster': {
    display: 'contents',
    '& .container-heading-one': {
      margin: '0',
      '& h1': {
        margin: '0 0 0.166em 0',
      },
    },
  },
  '& .container-heading-one + .container': {
    margin: 'auto 0',
    marginBottom: '0',
  },
  '& .container-logo + .container-heading-one + .container': {
    marginTop: '0',
  },
  '& .container + .container-heading-one, & .cluster + .container-heading-one': {
    marginTop: 'auto',
    marginBottom: '0',
  },
});

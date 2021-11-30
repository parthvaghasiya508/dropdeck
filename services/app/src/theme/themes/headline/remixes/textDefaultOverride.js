export const textDefaultOverride = () => ({
  justifyContent: 'flex-start !important',
  '& .container': {
    width: '100% !important',
    maxWidth: '100% !important',
    '& * ': {
      textAlign: 'left !important',
    },
  },
  '& .container-block-quote blockquote': {
    '& p': {
      fontSize: '1.75em !important',
    },
  },
});

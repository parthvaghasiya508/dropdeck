export const textDefaultOverride = () => ({
  '& .container': {
    width: '100% !important',
    maxWidth: '100% !important',
  },
  '& .container-block-quote blockquote': {
    '& p': {
      fontSize: '1.85em !important',
      lineHeight: '1.25 !important',
    },
  },
  '& .container + .container-chart': {
    paddingTop: '1.5em',
  },
  '& .container-chart + .container': {
    marginTop: '1em',
  },
});

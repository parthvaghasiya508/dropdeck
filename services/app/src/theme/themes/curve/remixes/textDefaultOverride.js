export const textDefaultOverride = () => ({
  justifyContent: 'flex-start !important',
  alignItems: 'flex-start !important',
  '& .container': {
    width: '100% !important',
    maxWidth: '100% !important',
    '& * ': {
      textAlign: 'left !important',
    },
  },
});

export const textListPanelsOverride = () => ({
  '& .deck-logo-container': {
    left: '1.2em',
    top: '1.2em',
    right: 'unset',
    bottom: 'unset',
  },
  
  // dupe of simple:
  '& .group-text': {
    padding: '6% !important',
    '& .container-heading-one': {
      marginTop: 'auto',
      '& h1': {
        fontSize: '4em',
        lineHeight: '1 !important',
      },
    },
    '& .group-text': {
      display: 'contents',
    },
  },
  '& .group-list .container li ': {
    margin: 'auto 0 !important',
    '& p': {
    },
  },

});

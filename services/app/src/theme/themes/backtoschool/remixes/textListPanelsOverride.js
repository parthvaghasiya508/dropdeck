export const textListPanelsOverride = () => ({
  '& .deck-logo-container': {
    left: '2.1em',
    top: '2.1em',
    right: 'unset',
    bottom: 'unset',
  },
  '& .group-text': {
    padding: '6% !important',
    paddingLeft: '2.5em !important',
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

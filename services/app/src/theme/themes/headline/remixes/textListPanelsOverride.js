export const textListPanelsOverride = () => ({
  '& .group-text': {
    padding: '6% !important',
    '& .container-heading-one': {
      marginTop: 'auto',
      '& h1': {
        fontSize: '10em',
        lineHeight: '0.9 !important',
      },
    },
    '& .group-text': {
      display: 'contents',
    },
  },

  '& .group-list .container ol': {
    paddingLeft: '6em !important',
    '& li:before, & li p': {
      fontSize: '1.4em !important',
    },
  },
  '& .group-list .container ul': {
    '& li:before, & li p': {
      fontSize: '1.4em !important',
    },
  },

});

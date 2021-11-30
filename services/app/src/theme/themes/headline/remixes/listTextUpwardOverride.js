export const listTextUpwardOverride = () => ({

  '& .group-list': {
    '& .container-bulleted-list, & .container-numbered-list': {
      '& ul, & ol': {
        '& li': {
          '&:last-of-type': {
            marginBottom: '0.35em !important',
          },
        },
      },
    },
  },

  '& .group-text': {
    '& .container': {
      '&:last-of-type': {
        '& H1, & H2, & p': {
          margin: '0 0 0.1em 0',
        },
      },
    },
  },

});

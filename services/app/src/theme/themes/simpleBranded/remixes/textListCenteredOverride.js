export const textListCenteredOverride = (palette) => ({

  // Simple dupe
  '& .container-bulleted-list:before, & .container-numbered-list:before': {
    background: `${palette.backgroundColor} !important`,
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    textShadow: 'none !important',
    padding: '0.25em 0 0.25em 2%',
    maxWidth: '54%',
  },

});

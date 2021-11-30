export const listUnorderedPanelsOverride = (palette) => ({

  '& li': {
    background: `${palette.title()} !important`,
    '&:before': {
      color: `${palette.background()}99 !important`,
    },
    '& p': {
      color: `${palette.background()} !important`,
    },
  },

});

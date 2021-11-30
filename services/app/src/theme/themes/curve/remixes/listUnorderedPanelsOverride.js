export const listUnorderedPanelsOverride = (palette) => ({
  justifyContent: 'center !important',
  '& li': {
    background: `${palette.accent()} !important`,
    '&:before': {
      color: `${palette.background()}99 !important`,
    },
    '& p': {
      color: `${palette.background()} !important`,
    },
  },
});

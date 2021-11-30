// haphazard effect on list items
export const listUnorderedPanelsOverride = (palette) => ({
  justifyContent: 'center !important',
  '& ul': {
    margin: '1em 0',
    '& li': {
      padding: '0.85em 1.25em !important',
      fontSize: '1em !important',
      border: '0 !important',
      boxShadow: 'none !important',
      borderRadius: '5em !important',
      '& p': {
        fontWeight: '500',
      },
    },
  },
  '& ol': {
    margin: '1em 0',
    '& li': {
      padding: '0.85em 1.25em 0.85em 3em !important',
      fontSize: '1em !important',
      border: '0 !important',
      boxShadow: 'none !important',
      borderRadius: '5em !important',
      '&:before': {
        fontWeight: '700',
      },
      '& p': {
        fontWeight: '500',
      },
    },
  },
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

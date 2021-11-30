export const clustersTextFixedImageAspectOverride = (palette) => ({
  '& .container.container-bulleted-list li': {
    '&:before': {
      background: palette.accentColor,
    },
  },
  '& .container.container-numbered-list li': {
    '&:before': {
      color: palette.accentColor,
      background: palette.backgroundColor,
    },
    '&:after': {
      background: palette.accentColor,
    },
  },
});

export const textListCenteredOverride = (palette) => ({
  backgroundImage: `linear-gradient( 90deg, ${palette.background()}, ${palette.background()} 51.5%, ${palette.title()} 51.5%, ${palette.title()} 100%) !important`,
  '& .container-bulleted-list, & .container-numbered-list': {
    '& li': {
      '&:before': {
        color: `${palette.background()}`,
      },
      '& p': {
        color: `${palette.background()}`,
      },
    },
  },
});

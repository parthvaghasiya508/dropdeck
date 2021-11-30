export const textListCenteredOverride = (palette) => ({
  '& .container-bulleted-list:before, & .container-numbered-list:before': {
    background: `${palette.titleColor} !important`,
  },
  '& .group-text': {
    '& h1': {
      lineHeight: '0.925',
    },
  },
});

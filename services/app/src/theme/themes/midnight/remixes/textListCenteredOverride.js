export const textListCenteredOverride = (palette) => ({
  '& .container-bulleted-list:before, & .container-numbered-list:before': {
    background: `${palette.textColor} !important`,
  },
});

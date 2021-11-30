export const textListCenteredOverride = (palette) => ({
  backgroundImage: `linear-gradient( 90deg, ${palette.background()}, ${palette.background()} 50%, ${palette.title()} 50%, ${palette.title()} 100%) !important`,
  '& .group-text': {
    width: '40%',
    paddingRight: '10%',
  },
  '& .group-list': {
    width: '45%',
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    '& li': {
      color: `${palette.background()}`,
      '&:before': {
        color: `${palette.accent()}`,
        lineHeight: '1.3 !important',
      },
      '& p': {
        color: `${palette.background()}`,
      },
    },
  },
  '& .hook': {
    display: 'block',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='305px' height='2097px' viewBox='0 0 305 2097' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M305 0 C305 2098 305 2097 305 2097 L2 2097 C2 2097 414.427 1358.25 265 0' fill='${palette.title().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    width: '100%',
    opacity: '1',
    zIndex: '1',
    backgroundSize: '95.35% 100%',
    backgroundPosition: '-44% 0',
    backgroundRepeat: 'no-repeat',
  },
});

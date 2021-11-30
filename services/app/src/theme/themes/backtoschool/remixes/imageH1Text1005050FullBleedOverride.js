export const imageH1text1005050FullBleedOverride = (palette) => ({
  backgroundImage: 'url(/themes/b2s/theme-b2s-bg.png)',
  '& .container-image': {
    boxSizing: 'border-box',
    padding: '1.47em 1.55em 0.25em 1.55em ',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-0.54em',
      left: '3.5em',
      width: '2.16em',
      height: '4em',
      background: 'url(/themes/b2s/theme-b2s-paperclip.png) bottom left no-repeat',
      backgroundSize: 'cover',
      zIndex: '1',
    },
    '& img': {
      animation: 'none',
      border: '0.5em solid #ffffff',
      boxShadow: '0 0.08em 0.075em rgba(0,0,0,.1)',
    },
  },
});

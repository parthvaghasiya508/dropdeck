export const imageFullBleedOverride = (palette) => ({
  padding: '3% !important',
  '& .group-text-before, & .group-text-after': {
    position: 'relative',
    transform: 'rotateZ(0.5deg)',
    '& .container-block-quote': {
      marginLeft: '-1.125em',
      '& blockquote': {
        overflow: 'hidden',
        '& p': {
          overflow: 'hidden',
          marginLeft: '-0.65em',
          paddingLeft: '1.15em',
          '&:before': {
            top: '0.15em !important',
            left: '0.75em !important',
          },
          '&:after': {
            bottom: '-0.6em !important',
            right: '0.05em !important',
          },
        },
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '-0.8em',
        left: '-1.1em',
        width: '2.16em',
        height: '4em',
        background: 'url(/themes/b2s/theme-b2s-paperclip.png) bottom left no-repeat',
        backgroundSize: 'cover',
        zIndex: '1',
        transform: 'rotate(270deg)',
      },
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-0.8em',
      left: '-1.1em',
      width: '2.16em',
      height: '4em',
      background: 'url(/themes/b2s/theme-b2s-paperclip.png) bottom left no-repeat',
      backgroundSize: 'cover',
      zIndex: '1',
      transform: 'rotate(270deg)',
    },
  },
});

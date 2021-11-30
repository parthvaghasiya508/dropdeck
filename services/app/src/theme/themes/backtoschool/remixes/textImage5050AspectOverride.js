// skew aspect image
export const textImage5050AspectOverride = () => ({
  '& .container-image': {
    right: '12% !important',
    '& .imgWrap': {
      padding: '0.5em',
      '& img': {
        transform: 'rotate(2.5deg)',
        margin: '0 1em',
        filter: 'drop-shadow(0 0.3em 0.2em rgba(0,0,0,.1)) drop-shadow(0 0.03em 0.06em rgba(0,0,0,0.45))',
      },
    },
  },
});

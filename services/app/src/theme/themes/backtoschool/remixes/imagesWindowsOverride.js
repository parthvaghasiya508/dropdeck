export const imagesWindowsOverride = () => ({
  '& .sequence-image.container-image': {
    gridGap: '3.5% !important',
    boxSizing: 'border-box',
    '& .element': {
      padding: '0.1em',
      boxSizing: 'border-box',
      '& .imgWrap img': {
        boxSizing: 'border-box',
        border: '0.5em solid #ffffff',
        boxShadow: '0 0.08em 0.075em rgba(0,0,0,.1)',
      },
    },
  },
});

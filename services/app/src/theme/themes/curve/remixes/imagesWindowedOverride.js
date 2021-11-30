export const imagesWindowedOverride = () => ({
  '& .sequence-image': {
    '&[data-length="2"]': {
      gridGap: '0.8em',
      borderRadius: '0',
      '& .element': {
        borderRadius: '0.5em',
        overflow: 'hidden',
      },
    },
    '&[data-length="3"], &[data-length="4"]': {
      borderRadius: '0.5em',
      gridGap: '0.4em',
    },
  }
});

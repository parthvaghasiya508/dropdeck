export const imagesAspectOverride = () => ({
  '& .sequence-image': {
    '&[data-length="2"], &[data-length="3"], &[data-length="4"]': {
      gridGap: '12% 6%',
      '& .element': {
        borderRadius: '0.5em',
        overflow: 'hidden',
      },
    },
  }
});

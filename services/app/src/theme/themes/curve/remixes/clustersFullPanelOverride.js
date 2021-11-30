export const clustersFullPanelOverride = (palette) => ({
  '& .sequence': {
    borderWidth: '0.05em',
    borderColor: `${palette.text()}44`,
    '& .cluster': {
      borderColor: `${palette.text()}44`,  
    },
  },
  '& .group-text-before, & .group-text-after': {
    borderWidth: '0.05em',
    borderColor: `${palette.text()}44`,   
  },
});

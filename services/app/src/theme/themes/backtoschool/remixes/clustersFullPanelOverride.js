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

  '& .sequence-cluster-bulleted-list .cluster .container-bulleted-list  ul li': {
    '&:before': {
      marginLeft: '-1em',
      marginRight: '0.5em',
    },
  },

});

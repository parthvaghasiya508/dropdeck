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

  '& .sequence[data-length="2"], & .sequence[data-length="3"], & .sequence[data-length="4"]': {
    '& .cluster': {
      '& .container.container-paragraph': {
        '& p': {
          fontSize: '1.2em',
        },
      },
      '& .container.container-heading-one, & .container.container-heading-two': {
        '& h1': {
          fontSize: '2.55em',
          margin: '0 0 0.2em 0', 
        },
        '& h2': { margin: '0 0 0.4em 0', },
      },
      '& .container.container-bulleted-list ul, & .container.container-bulleted-list ol': {
        '& li': {
          fontSize: '1.2em',
          '&:before': {
            marginLeft: '-1.1em',
          },
        },
      },
    },
  },

});

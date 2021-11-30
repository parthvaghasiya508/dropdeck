export const clustersFullPanelOverride = (palette) => ({

  '& .sequence': {
    borderWidth: '0.05em',
    borderColor: `${palette.text()}44`,
    '& .cluster': {
      borderColor: `${palette.text()}44`,
      // Quote
      '& .container.container-block-quote': {
        '& blockquote': {
          position: 'relative',
          marginTop: '1em',
          paddingTop: '1.5em',
          paddingBottom: '0.5em',
          '&:before': {
            content: '"“"',
            display: 'block',
            position: 'absolute',
            transform: 'scale(4)',
            left: 'calc(50% - 0.5em)',
            height: '0.5em',
            width: '0.5em',
            borderRadius: '5em',
            zIndex: '3',
            lineHeight: '1.1',
            textAlign: 'center',
            padding: '0.2em',
            top: '0',
            background: 'transparent !important',
          },
          '&:after': {
            display: 'none',
          },
          '& p': {
            borderLeft: '0 !important',
            marginBottom: '0',
            padding: '0',
            textAlign: 'center',
          },
        },
      },
      '& .container.container-image': {
        backdropFilter: 'brightness(0.5) saturate(2)',
      },
    },
  },
  '& .group-text-before, & .group-text-after': {
    borderWidth: '0.05em',
    borderColor: `${palette.text()}44`,   
  },
    
});

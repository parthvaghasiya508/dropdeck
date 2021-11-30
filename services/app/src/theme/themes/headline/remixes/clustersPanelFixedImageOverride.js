export const clustersPanelFixedImageOverride = (palette) => ({
  justifyContent: 'center !important',
  '& .sequence .cluster': {
    border: '0.005em solid',
    borderColor: `${palette.text()}22 !important`,
    background: 'transparent !important',
    backdropFilter: 'brightness(0.98) saturate(1.35)',
    borderRadius: '0',
    boxShadow: 'none',
    padding: '0.875em', 
    paddingBottom: '1.5em', 
    '& .container': {
      textAlign: 'center',
      '& *': {
        textAlign: 'center',
      },
    },
    // when first element is not an image add some additional space at top of cluster
    '& .container:first-child:not(.container-image)': {
      marginTop: '0.875em',
    },
    // when first element is a logo add space at top of cluster
    '& .container:first-child.container-logo': {
      marginTop: '0em',
    },
    // when last element is an image pull in bottom edge
    '& .container:last-child.container-image': {
      marginBottom: '-0.25em',
    },
    // all images
    '& .container.container-image': {
      margin: '0 0 1em 0',
      borderRadius: '0em',
    },
    // when non-image element follows image, add space
    '& .container.container-image + .container:not(.container-image)': {
      marginTop: '1.25em',
    },
    // when image follows another element, add space
    '& .container:not(.container-image) + .container.container-image': {
      marginTop: '0.75em',
    },
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
  },
  
  '& .sequence[data-length="2"], & .sequence[data-length="3"], & .sequence[data-length="4"]': {
    '& .cluster': {
      '& .cluster': {
        width: '100% !important',
        margin: '0 !important',
        padding: '0 !important',
      },
      '& .container.container-heading-one, & .container.container-heading-two': {
        '& h1': {
          fontSize: '2.55em',
        },
      },
    },
  },
  '& .sequence[data-length="3"]': {
    '& .cluster': {
      width: '31%',
      '& .container.container-heading-one, & .container.container-heading-two': {
        '& h1': {
          fontSize: '2.35em',
        },
      },
    },
  },
  '& .sequence[data-length="4"]': {
    '& .cluster': {
      '& .container.container-heading-one, & .container.container-heading-two': {
        '& h1': {
          fontSize: '2.15em',
        },
      },
    },
  },

  '& .group-text-after': {
    marginTop: '1em',
    fontSize: '95%',
    '& h1': {
      marginBottom: '0.25em',
    },
  },
  '& .group-text-before': {
    marginBottom: '1em',
    fontSize: '95%',
    '& h1': {
      marginBottom: '0.25em',
    },
  },

  // If sequence contains cluster(s) with list
  '& .sequence-cluster-numbered-list, .sequence-cluster-bulleted-list': {
    '& .cluster': {
      paddingLeft: '1.75em',
      paddingRight: '1.75em',
      // when first element is image add space at top
      '& .container:first-child.container-image': { marginTop: '0.875em' },
    },
  },

});

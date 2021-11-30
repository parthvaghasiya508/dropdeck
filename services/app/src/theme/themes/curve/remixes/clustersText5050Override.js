export const clustersText5050Override = (palette) => ({
  padding: '0',
  '& .sequence': {
    fontSize: '90%',
    '&[data-length="2"] .cluster': {
      width: '42% !important',
      padding: '1em',
      borderRadius: '0.5em',
      position: 'relative',
      boxSizing: 'border-box',
      margin: '0 auto !important',
      '& .cluster': {
        width: '100%',
        display: 'contents',
      },
      '&:before': {
        padding: '0',
        display: 'block',
        // content: '"1"',
        position: 'absolute',
        textAlign: 'center',
        lineHeight: '2',
        width: '2em',
        height: '2em',
        color: '#ffffff',
        borderRadius: '50%',
        top: '-0.85em',
        fontSize: '1.15em',
        left: 'calc(50% - 1em)',
        fontWeight: '600',
        background: '#292f36',
      },
      // first panel bg
      '&:first-of-type': {
        background: `${palette.accent()}`,
        '& .container *, & .container p:before, & .container p:after': {
          color: '#ffffff !important',
        },
      },
      // second panel text
      '&:last-of-type': {
        background: '#ffffff',
        '& .container *': {
          color: `${palette.accent()}`, // colouri
        },
        '& .container h1': {
          color: '#292f36 !important',
        },
        '& .container p, & .container p:before, & .container p:after': {
          color: `${palette.accent()} !important`,
        },
      },
      '&:last-of-type:before': {
        // content: '"2"',
      },
    },
  },
  '& .sequence .cluster': {
    padding: '0.875em', 
    paddingBottom: '1.25em', 
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
      borderRadius: '0.25em',
    },
    // when non-image element follows image, add space
    '& .container.container-image + .container:not(.container-image)': {
      marginTop: '1.25em',
    },
    // when image follows another element, add space
    '& .container:not(.container-image) + .container.container-image': {
      marginTop: '0.75em',
    },
    '& .container.container-block-quote': {
      '& blockquote': {
        textAlign: 'center',
        width: '100% !important',
        '&:before': {
          display: 'none',
        },
        '& p': {
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    '& .cluster': {
      width: '100% !important',
      margin: '0 !important',
      padding: '0 !important',
    },
    '& .container.container-logo img': {
      height: '7em',
      borderRadius: '0.5em',
    },
  },

});

// 2x clusters double line
export const clustersTextFixedImageOverride = (palette) => ({
  '&  .sequence[data-length="2"] .cluster': {
    '&:nth-of-type(2)': {
      position: 'relative',
      '&:before, &:after': {
        color: `${palette.accentColor} !important`,
        content: '""',
        position: 'absolute',
        left: '-6%',
        top: '0%',
        height: '100%',
        borderLeft: '0.1em solid !important',
      },
      '&:after': {
        left: '-7.5%',
      },
    },
    '& .cluster:before': {
      display: 'none',
    },
    '& .container *': {
      textAlign: 'center !important',
    },
    '& .container.container-block-quote': {
      marginBottom: '0.5em',
      '& blockquote': {
        margin: '0 auto',
        '& p': {
          textAlign: 'left !important',
        },
      },
    },
  },
});

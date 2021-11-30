export const clustersText5050Override = () => ({
  justifyContent: 'center !important',
  '& h2': {
    lineHeight: '1',
  },
  '& .sequence': {
    // 2 x cluster
    '&[data-length="2"] .cluster': {
      width: '43%',
      '& .cluster': {
        width: '100%',
      },
    },
  },
  '& .sequence .cluster .container.container-block-quote': {
    '& blockquote': {
      position: 'relative',
      paddingTop: '2em',
      marginTop: '2em',
      paddingBottom: '0.5em',
      width: '100% !important',
      '&:before': {
        content: '"“"',
        display: 'block',
        position: 'absolute',
        transform: 'scale(4)',
        left: 'calc(50% - 0.25em)',
        height: '0.5em',
        width: '0.5em',
        borderRadius: '5em',
        zIndex: '3',
        lineHeight: '1.1',
        textAlign: 'center',
        padding: '0.2em',
        top: '0',
      },
      '&:after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: '35%',
        right: '35%',
        height: '0',
        borderTop: '0.1em solid',
        zIndex: '2',
        lineHeight: '1',
        opacity: '0.2',
        top: '0.45em',
      },
      '& p': {
        borderLeft: '0 !important',
        marginBottom: '0',
        padding: '0',
      },
    },
  },
});

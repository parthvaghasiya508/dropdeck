export const fallbackGridOverride = (palette) => ({
  padding: '2%',
  '& .grid-container': {
    gridGap: '1em',
    '& .container': {
      border: '0 !important',
      background: 'transparent !important',
      backdropFilter: 'brightness(1.35) saturate(1.2)',
      borderRadius: '0.525em',
      padding: '2em',
      '& .element': {
        alignItems: 'center',
        justifyContent: 'center',
      },
      '&.container-heading-one': {
        justifyContent: 'flex-start',
        '& h1': {
          lineHeight: '1.15',
          fontSize: '2.5em',
        },
      },
      '&.container-heading-two': {
        justifyContent: 'flex-start',
      },
      '&.container-logo': {
        border: '0.025em solid rgba(0,0,0,0.075)',
      },
    },
  },
});

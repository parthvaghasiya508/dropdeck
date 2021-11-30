export const fallbackGridOverride = (palette) => ({
  padding: '3% !important',
  '& .grid-container': {
    gridGap: '1em !important',
    '& .container': {
      background: 'transparent !important',
      backdropFilter: 'brightness(1.055)',
      border: '0 !important',
      borderRadius: '0.75em',
      boxShadow: '0.08em 0.24em 0.8em 0.12em rgb(0 0 0 / 9%)',
      padding: '1.75em',
      alignItems: 'center',
      justifyContent: 'center',
      '&.container.container-heading-one': {
        justifyContent: 'center',
        '& h1': {
          lineHeight: '1',
          fontSize: '2.8em',
          textAlign: 'center',
        },
      },
      '&.container-heading-two': {
        justifyContent: 'flex-start',
      },
      '&.container-logo': {
        background: '#ffffff',
      },
      '&.container-code': {
        background: '#222 !important',
        border: '0 !important',
      },
    },
  },
  // Hide all branding on this slide
  '& .deck-logo-container': {
    display: 'none',
  },
});

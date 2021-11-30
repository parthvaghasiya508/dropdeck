export const textHeadingColsOverride = (palette) => ({
  padding: '0',
  justifyContent: 'center !important',
  '& .container.container': {
    alignItems: 'baseline',
    boxSizing: 'border-box',
    padding: '0',
  },
  '& .element': {
    padding: '1.5em 1em 1.5em 1em',
    borderRadius: '0.25em',
    position: 'relative',
    boxSizing: 'border-box',
    width: '40% !important',
    margin: '0 auto !important',
    // '&:before': {
    //   padding: '0',
    //   display: 'block',
    //   content: '"1"',
    //   position: 'absolute',
    //   textAlign: 'center',
    //   lineHeight: '2',
    //   width: '2em',
    //   height: '2em',
    //   borderRadius: '50%',
    //   top: '-0.9em',
    //   fontSize: '1em',
    //   left: 'calc(50% - 1em)',
    //   color: '#fff',
    //   background: '#202020',
    // },
    '&:first-of-type': {
      background: `${palette.accent()}`,
      '& h1, & h2': {
        color: '#ffffff',
      },
    },
    '&:last-of-type': {
      background: '#ffffff',
      '& h1, & h2': {
        color: `${palette.accent()}`,
      },
    },
    // '&:last-of-type:before': {
    //   content: '"2"',
    // },
  },
  '& h1': {
    fontSize: '1.85em !important',
  },
  '& h2': {
    fontSize: '1.65em !important',
  },
});

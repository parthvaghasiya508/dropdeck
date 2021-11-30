//  tic2:   Image full bleed, text split and horzontally aligned. Two variations. Either image pinned to top of slide, or to bottom.
// ---------------------------------------------------------------------------------------------------------------------------------
export const tic2Styling = (align, alignItems) => {
  const imageContainer = {
    position: 'absolute',
    left: '0',
    right: '0',
    height: '65%',
    '& .element': {
      width: '100% !important',
      alignSelf: 'flex-end !important',
      margin: '0 !important',
      '& .imgWrap img': {
        objectFit: 'cover',
      },
    },
  };
  if (align === 'bottom') {
    imageContainer.bottom = '0';
  } else {
    imageContainer.top = '0';
  }
  return {
    height: '100%',
    alignItems,
    display: 'grid',
    gridGap: '0.15em',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateRows: '0fr',
    padding: '3% 4.5%',
    '& .deck-logo-container:before': {
      background: '#fff',
    },
    '& .container:not(.container-image)': {
      display: 'flex',
      justifyContent: 'center', // -
      alignItems: 'flex-start !important', // |
      margin: '0 !important',
      height: '25.5%',
      overflow: 'hidden',
      gridColumn: '1 / -1',
      flexDirection: 'column',
      zIndex: '2',
      width: '100%',
      '& h1, & h2, & p': {
        margin: '0 !important',
        padding: '0.25em 0',
      },
      '& h2': {
        lineHeight: '1.3',
      },
    },
    '& .container-block-quote': {
      width: '100%',
    },
    '& .container-math  > div .katex-display > .katex': {
      textAlign: 'center',
    },

    '& .container-image': imageContainer,
  };
};

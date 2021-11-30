export const tic1Styling = (align, alignItems) => {
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
    gridTemplateRows: '0fr', // 1
    padding: '3% 4.5%',
    '& .deck-logo-container:before': {
      background: '#fff',
    },
    '& .container': {
      display: 'flex',
      justifyContent: 'center', // -
      alignItems: 'flex-start !important', // |
      margin: '0 !important',
      height: '26%',
    },
    '& .container-heading-one': {
      zIndex: '2',
      gridColumn: '1 / 6',
      display: 'flex',
      flexDirection: 'column',
      paddingRight: '1em',
      '& H1': {
        textAlign: 'left',
        width: '100%',
        margin: '0',
      },
    },
    '& .container-heading-two, & .container-paragraph, & .container-block-quote, & .container-code, & .container-math': {
      zIndex: '2',
      gridColumn: '6 / -1',
      display: 'flex',
      flexDirection: 'column',
      '& h2': {
        margin: '0.1em 0 0 0',
        lineHeight: '1.3',
      },
      '& P': {
        margin: '0.35em 0 0 0',
      },
    },
    '& .container-block-quote': {
      width: '100%',
      '& P': {
        margin: '0.35em 0 0 0',
      },
    },
    '& .container-image': imageContainer,
  };
};

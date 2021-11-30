// fullbleed fade
export const imageFullBleedTextGradientOverride = (palette) => ({
  backgroundImage: 'unset',
  '&:before': {
    background: 'rgba(255,255,255,0.15)',
    width: '100% !important',
    backdropFilter: 'brightness(0.8) contrast(1.1)',
  },
  '& .container.container-heading-one, & .container.container-heading-two, & .container.container-paragraph, & .container.container-block-quote': {
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    textAlign: 'left',
    textShadow: 'rgba(0,0,0,0.15)',
    '& p, & p:before, & p:after': {
      textAlign: 'left',
    },
    '& h1': {
      opacity: '1',
      margin: '0 0 0.3em 0',
      fontSize: '4.5em !important',
    },
  },
  '& .container.container-heading-two + .container-heading-one h1': {
    margin: '-0.1em 0 0 0',
  },
  '& .container-bulleted-list, & .container-numbered-list': {
    maxWidth: '100%',
    width: 'auto',
    margin: '0 auto',
    textAlign: 'left',
  },
  '& .container-block-quote': {
    textAlign: 'left',
    '& p': {
      textAlign: 'left',
      
    },
  },
  // Logo
  '& .container-logo': {
    width: '45%',
    margin: '0 auto 1.5em auto !important',
    '& .element': {
      margin: '0 auto',
      '& .imgWrap': {
        '& img': {
          margin: '0 auto',
        },
      },
    },
  },

});

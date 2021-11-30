export const textImage5050AspectOverride = () => ({
  justifyContent: 'center !important',
  '& .container': {
    width: '31% !important',
    '& .container': { width: '100% !important' },
  },
  '& .container-paragraph + .container-heading-one, & .container-heading-two + .container-heading-one': {
    marginBottom: '0',
    marginTop: 'auto',
  },
  '& .container.container-image, & .container.container-logo, & .container.container-video': {
    width: '55% !important',
    top: '6%',
    right: '4%',
    bottom: '6%',
    maxHeight: '100%',
  },
  '& .container.container-block-quote blockquote:before': {
    top: '0',
    transform: 'scale(3)',
  },
});

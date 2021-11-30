// cluster headings
export const clustersText5050Override = (palette) => ({
  '& .container-block-quote': {
    textAlign: 'center',
    marginTop: '0.5em !important',
    '& blockquote': {
      margin: '0 auto',
      width: 'auto !important',
      minWidth: '50%',
      '& p': {
        width: '100%',
      },
    },
  },
  '& .container-image .imgWrap img': {
    borderRadius: '0',
    // background: `${palette.textColor}`,
    // border: `0.0125em solid ${palette.textColor}`,
  },
});

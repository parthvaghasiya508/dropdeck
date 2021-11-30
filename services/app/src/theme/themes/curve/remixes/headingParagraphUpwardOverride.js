export const headingParagraphUpwardOverride = () => ({
  '& .container': {
    width: '100%',
    '& *': {
      textAlign: 'left !important',
    },
  },
  '& .group-headings, & .container-paragraph': {
    justifyContent: 'flex-start !important',
    gridRowEnd: '2',
    '& p': {
      margin: '0 0 1em 0',
    },
  },
});

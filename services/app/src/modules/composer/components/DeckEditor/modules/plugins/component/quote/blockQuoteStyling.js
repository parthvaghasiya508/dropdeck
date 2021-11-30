export const blockQuoteStyling = () => ({
  width: '85%',
  '& blockquote': {
    textAlign: 'left',
    padding: '0',
    margin: '0',
    '& p': {
      display: 'block',
      position: 'relative',
      fontSize: '1.5em',
      lineHeight: '1.35em',
      margin: '0 0 1em 0',
      textIndent: '0.85em', // 0.75
      '&:before, &:after': {
        content: '"“"',
        fontSize: '1.6em',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '0',
        margin: '0.3em 0 0 -1.1em', // 0.35em 0 0 -1em
        position: 'absolute',
        top: '0.15em',
        opacity: '0.75',
      },
      '&:after': {
        content: '"”"',
        margin: '0 0 0 0.05em',
        position: 'relative',
      },
    },
  },
});

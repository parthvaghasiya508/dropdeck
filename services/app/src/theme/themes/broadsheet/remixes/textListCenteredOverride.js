export const textListCenteredOverride = (palette) => ({
  '& .group.group-text, & .container.container-numbered-list, & .container.container-bulleted-list': {
    position: 'absolute',
    top: '0',
    left: '0',
    minWidth: '50%',
    width: '50%',
    height: '100%',
    padding: '0',
    margin: '0',
    display: 'flex',
    right: 'unset',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  '& .group.group-text .container': {
    width: '75%',
    margin: '0 auto',
    '&.container-heading-one, &.container-heading-two, &.container-paragraph': {
      textAlign: 'center',
      '& h1, & h2, p': {
        textAlign: 'center',
      },
      '& h1': {
        lineHeight: '1.125',
      },
    },
    '&.container-heading-two + .container-heading-one h1': {
      marginTop: '0.325em',
    },
    '&.container-heading-two + .container-paragraph p': {
      marginTop: '1em',
    },
  },
  '& .container.container-numbered-list, & .container.container-bulleted-list': {
    right: '0',
    left: 'unset',
    background: `${palette.title()} !important`,
    '& ol, & ul': {
      maxWidth: '75%',
      '& li:before': {
        color: `${palette.accent()} !important`,
      },
      '& li p': {
        color: `${palette.background()} !important`,
      },
    },
  },
  '& .container-bulleted-list:before, & .container-numbered-list:before': {
    width: '0',
  },
});

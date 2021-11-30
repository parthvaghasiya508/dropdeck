export const listStyling = (type) => ({
  width: '100%',
  margin: '0',
  padding: '0',

  [`& ${type}`]: {
    zIndex: '1',
    margin: 0,
    padding: 0,
    counterReset: 'listcounter',
    listStyle: 'none',
    width: '98.5%',
    marginBottom: '0.75em',
    '& li': {
      margin: "0.25em 0 0.25em 1.5em",
      padding: 0,
      counterIncrement: 'listcounter',
      lineHeight: '1.25',
      minHeight: '1.25em',
      width: 'auto',
      '&:before': {
        marginLeft: "-1.5em",
        float: 'left',
        fontFamily: 'Inter var',
      },
      '& p': {
        fontSize: '100%',

        // @todo why do we need this? this overrides what's in remixes
        // margin: "0",
      },
    },
    // nested
    [`& ${type}`]: {
      margin: "0",
      '& li': {
        fontSize: '100%',
        margin: "0.25em 0 0.25em 1.5em",
        '& li': {
          margin: "0.25em 0 0.25em 1.5em",
        },
      },
    },
  }
});

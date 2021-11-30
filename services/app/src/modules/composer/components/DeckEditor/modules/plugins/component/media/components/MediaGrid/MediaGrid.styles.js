import { makeStyles } from "@material-ui/styles";

export const mediaGridStyles = () => makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    padding: "1rem 1rem 0 1rem",
    top: "calc(7rem + 4px)",
    height: "calc(100% - 8rem - 4px)",
    [theme.breakpoints.down('xs')]: {
      padding: "0.4rem 0.4rem 0 0.4rem",
      top: "calc(6rem + 2px)",
      height: "calc(100% - 5rem)",
    },
    overflow: "hidden",
    boxSizing: "border-box",
    width: "100%",
    '&:before': {
      content: '""',
      width: '100%',
      height: '1rem',
      zIndex: 5,
      left: 0,
      right: 0,
      top: 0,
      position: 'absolute',
      background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
    },
  },
  attribution: {
    textAlign: 'center',
    padding: '0.75rem 1rem 0 1rem',
    boxSizing: 'border-box',
    width: '100%',
    fontSize: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
    color: theme.palette.text.secondary,
    position: 'relative',
    zIndex: 1,
    '& .unsplash': {
      transition: "all 300ms ease",
      height: '12px',
      margin: '1px 0 0 7px',
      opacity: '0.8',
      '&:hover': {
        opacity: '1',
      },
    },
  },
  outer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: "1rem",
    backgroundColor: theme.palette.background.elev01,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.background.border00,
    borderBottomColor: theme.palette.background.border01,
    boxShadow: `rgba(0, 0, 0, ${theme.dark() ? 0.5 : 0.2}) 0px 6px 13px -8px, rgba(0, 0, 0, ${theme.dark() ? 0.85 : 0.2}) 0px 4px 8px -8px, rgba(0, 0, 0, 0.02) 0px -3px 8px -6px`,
    borderRadius: 6,
    overflow: "hidden",
    boxSizing: "border-box",
    position: 'relative',
    zIndex: 10,
  },
  inputLabel: {
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    fontSize: '16px',
    marginRight: 10,
  },
  input: {
    width: "100%",
    margin: "5px 0",
    padding: theme.dark() ? '7px 12px' : '6px 12px',
    fontSize: '16px',
    fontWeight: theme.dark() ? '500' : '600',
    letterSpacing: theme.dark() ? '0' : '-0.018em',
    color: theme.palette.input.secondary,
    background: theme.palette.gradient.stop02,
    border: `1px solid ${theme.palette.background.border01} !important`,
    borderRadius: '4px',
    boxShadow: `0 0 0 3px ${theme.palette.background.border02}`,
    transition: "all 300ms ease",
    '&:focus': {
      borderBottom: `1px solid ${theme.palette.primary.main} !important`,
    },
  },
  checkWrapper: {
    display: "block",
    position: "absolute",
    top: 14,
    left: 14,
    height: 20,
    width: 20,
    padding: 3,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
  },
  check: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  image: {
    position: "relative",
    width: "100%",
    height: 120,
    objectFit: 'cover',
    borderRadius: 4,
    border: '1px solid transparent',
    boxShadow: `0 0 0 2px ${theme.palette.input.primaryBG}`,
    margin: '2px',
    padding: '0',
    transition: "all 300ms ease",
    boxSizing: 'border-box',
    "&:not(.focused)": {
    },
    "&.focused": {
      border: `1px solid #FFFFFF`,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    }
  },

  // Image grid
  imageGridInner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    overflowY: 'auto',
    paddingRight: '0.25rem',
    textAlign: 'center',
    width: '100%',
    scrollBehavior: 'smooth',
  },
  imageGridItems: {
    flex: 1,
    position: 'relative',
  },
  imageGridItemContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: '100%',
    height: '128px',
    cursor: 'pointer',
    position: 'relative',
    textAlign: "center",
    "&:hover, &.focused": {
      "& .photographer": {
        opacity: 0.8,
        transition: "opacity 150ms ease-out"
      }
    }
  },
  imageWrapper: {
    width: '100%',
  },
  photographer: {
    marginLeft: 2,
    textDecoration: "none",
    display: "block",
    transition: "opacity 150ms ease-in",
    padding: "2px 6px 2px 10px",
    opacity: 0,
    position: "absolute",
    fontSize: 11,
    bottom: 6,
    borderRadius: 5,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.elev01,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    fontWeight: "bold",
    "&:hover": {
      opacity: "1 !important",
      textDecoration: "underline"
    }
  },

  // Meta data and helpers
  helper: {
    padding: '12px 0 18px 0',
    textAlign: "center",
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
  },
  error: {
    color: theme.palette.primary.main
  },
  insertSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  loadMoreSpinner: {
    margin: '1rem 0',
  },
  noResults: {
    color: '#ffae42',
    flex: 1,
    padding: '0.25rem',
  }

}));

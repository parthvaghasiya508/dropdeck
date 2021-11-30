import { makeStyles } from "@material-ui/styles";

export const templateMenuStyles = () => makeStyles((theme) => ({
  root: {
    cursor: "default !important",
    position: "relative",
  },
  leftFade: {
    zIndex: 11,
    top: 2,
    left: -1,
    position: "absolute",
    width: 1,
    height: 93,
    boxShadow: `${theme.dark() ? "rgba(26, 26, 26, 1)" : "rgb(237, 237, 239)"} 0px 0px 5px 7px`,
  },
  container: {
    cursor: "default !important",
    overflowX: "scroll",
    "-ms-overflow-style": "none",
    scrollBarWidth: "none",
    whiteSpace: "nowrap",
    width: "auto",
    "&::-webkit-scrollbar": {
      display: "none"
    },
  },
  wrapper: {
    userSelect: "none",
    cursor: "default !important",
    position: "relative",
    width: 150,
    height: 95,
    border: `1px solid ${theme.palette.background.border00}`,
    display: "inline-block",
    marginLeft: 2,
    marginRight: 8,
    verticalAlign: "top",
    overflow: 'hidden',
    whiteSpace: "normal",
    borderRadius: 4,
    transition: '250ms all ease-in 0s',
    boxSizing: 'border-box',
    "&:first-of-type": {
      marginLeft: 10
    },
    "&:last-of-type": {
      marginRight: 92
    }
  },
  loadMoreSpinner: {
    width: 148,
    height: 93,
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    position: 'absolute',
    '& .icon': {
      zIndex: 10,
    }
  },
  moreButton: {
    zIndex: 15,
    display: "flex",
    alignItems: "center",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    position: "absolute",
    borderLeft: `1px solid ${theme.dark() ? "rgba(29,29,31,0.75)" : "rgba(29,29,31,0.075)"}`, //
    background: `${theme.palette.type === "dark" ? "rgba(29,29,31,0.75)" : "rgba(237, 237, 239, 0.7)"}`, //
    backdropFilter: 'blur(4px) saturate(1.8)', //
    top: -10,
    right: -10,
    height: 115,
    padding: "0 12px 0 0px",
    "& button": {
      margin: 8,
      marginTop: 6,
      marginRight: 6,
    }
  }
}));

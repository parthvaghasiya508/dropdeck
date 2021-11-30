import { makeStyles } from "@material-ui/styles";

export const REMIX_SLIDE_WIDTH = 250;

export const remixPreviewStyles = () => makeStyles((theme) => ({
  root: {
    display: "block",
    overflow: "none",
    // inner panel
    '&:first-child > div': {
      background: `${theme.palette.type === "dark" ? "radial-gradient(ellipse at center, #262628 0%, #262628 50%, #1D1D1F 80%)" : "#f4f4f5"}`,
      borderColor: `${theme.palette.type === "dark" ? "#1d1d1f" : "#ededef"}`,
    },
  },
  // wrapper for remix carousel
  previewContainer: {
    minHeight: 164, // This is the computed height, stops a jump in the browser when height is recalculated to create a margin below slide when modal is open
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    padding: `${theme.palette.type === "dark" ? "16px 8px 16px 8px" : "16px 18px 16px 18px"}`,
    margin: `${theme.palette.type === "dark" ? "0 8px 0 8px" : "-10px -18px 0 -18px"}`,
    background: `${theme.palette.type === "dark" ? "transparent" : "linear-gradient(to top, #f4f4f5, rgb(255, 255, 255))"}`,
  },
  container: {
    overflowX: "scroll",
    "-ms-overflow-style": "none",
    scrollBarWidth: "none",
    whiteSpace: "nowrap",
    width: "auto",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  wrapper: {
    width: REMIX_SLIDE_WIDTH,
    display: "inline-block",
    margin: '3px 8px 5px 8px',
    verticalAlign: "top",
    overflow: 'hidden',
    whiteSpace: "normal",
    boxShadow: "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px",
    borderRadius: '3px',
    transition: '250ms all ease-in 0s',
    boxSizing: 'border-box',
    transform: 'scale(0.965)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1)',
    },
    "& a": {
      userSelect: "none",
      pointerEvents: "none"
    }
  },
  activeRemix: {
    borderRadius: '3px',
    transform: 'scale(1)',
    boxShadow: `0 0 0 1px rgb(255 255 255), 0 0 0 3px ${theme.palette.primary.main}`,
    color: `${theme.palette.type === "dark" ? "#ffffff" : "#1d1d1f"}`,
    '& > div': {
      borderRadius: '2px',
      overflow: 'hidden',
    },
  },
  paginateRemix: {
    position: 'absolute',
    top: 15,
    bottom: 15,
    zIndex: 2,
    padding: '0 0.3em',
    '& button': {
      height: '100%',
      borderRadius: 0,
      color: `${theme.palette.type === "dark" ? "#ffffff" : "#1d1d1f"}`,
      '&.Mui-disabled': {
        background: 'transparent',
        color: 'transparent',
      },
      '& svg': {
        transition: '250ms all ease-in-out 0s',
        transform: 'scale(1.25)',
      },
      '&:hover svg': {
        transform: 'scale(1.65)',
        color: `${theme.palette.type === "dark" ? "#ffffff" : "#1d1d1f"}`,
        textShadow: '0px 2px 4px rgba(0,0,0,0.25)',
      },
    },
    '&:first-of-type': {
      left: '0',
      '& button': {
        background: `${theme.palette.type === "dark" ? "linear-gradient(270deg,rgba(0,0,0,0) 0%,#202020 95%,#202020)" : "linear-gradient(to top, rgb(245, 245, 246), rgb(255, 255, 255))"}`,
      },
    },
    '&:last-of-type': {
      right: '0',
      '& button': {
        background: `${theme.palette.type === "dark" ? "linear-gradient(90deg,rgba(0,0,0,0) 0%,#202020 95%,#202020)" : "linear-gradient(to top, rgb(245, 245, 246), rgb(255, 255, 255))"}`,
      },
    },
  },
}), { meta: 'RemixPreview' });

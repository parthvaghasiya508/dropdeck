import { makeStyles } from "@material-ui/styles";

export const slideToolbarStyles = () => makeStyles((theme) => ({
  root: {
    display: 'flex',
    opacity: '0',
    position: 'absolute',
    zIndex: '65',
    background: theme.dark() ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)",
    borderRadius: '3em',
    margin: '0 auto',
    bottom: '30px',
    padding: '0.325em 0.75em',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translate(0, 2px)',
    width: '162px',
    marginLeft: 'calc(50% - 81px)',
    boxSizing: 'border-box',
    '& button': {
      borderWidth: 1,
      transform: "scale(1,1)",
      transition: "transform 100ms ease-in-out",
      backgroundColor: theme.dark() ? "rgba(52,52,52,0.9)" : "rgba(255,255,255,0.9)",
      boxShadow: '0px 1px 2px rgba(0,0,0,0.15)',
      "&:hover": {
        transform: "scale(1.05,1.05)",
        transition: "transform 300ms ease-in-out",
        backgroundColor: theme.dark() ? "rgba(52,52,52,0.97)" : "rgba(255,255,255,1)",
        boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
      },
    },
    "& button:nth-of-type(2)": {
      padding: '0',
      "& img:nth-of-type(1)": {
        opacity: theme.dark() ? "0.7" : "0.8",
        display: 'block',
      },
      "& img:nth-of-type(2)": {
        opacity: '0',
        display: 'none',
      },
      '&:hover img:nth-of-type(1)': {
        opacity: '1',
      },
    },
    "&.buttonUp button:nth-of-type(2)": {
      "& img:nth-of-type(1)": {
        opacity: '0',
        display: 'none',
      },
      "& img:nth-of-type(2)": {
        opacity: '1',
        display: 'block',
      },
    },
    "& button.drawerOpen": {
      backgroundColor: theme.dark() ? "rgba(52,52,52,0.97)" : "rgba(255,255,255,1)",
      transform: "scale(1.05,1.05)",
      "& img": {
        opacity: '1 !important',
      },
    },
  },

  dragIcon: {
    color: theme.palette.text.primary,
    fontSize: 20,
  },

  dragHandle: {
    position: 'absolute',
    zIndex: 5,
    width: 34,
    height: 34,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '-5px',
    right: '-6px',
    padding: '4px 4px 8px 8px',
    opacity: 1,
    transition: "all 100ms ease-in-out",
    "& svg": {
      transition: "transform 100ms ease-in-out",
      transform: "scale(1,1)",
      width: 18,
      height: 18,
      borderRadius: 4,
      padding: '6px',
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.dark() ? theme.palette.background.border01 : "#dee3ea !important",
      background: theme.dark() ? theme.palette.background.main : theme.palette.background.default,
      color: theme.palette.text.secondary,
    },
    "&:hover": {
      cursor: "grab",
      fallbacks: [{ cursor: "grab" }, { cursor: "-moz-grab" }, { cursor: "-webkit-grab" }],
      opacity: 1,
      background: 'transparent',
      transition: "all 100ms ease-in-out",
      transform: "scale(1.08,1.08)",
      "& svg": {
        background: theme.dark() ? theme.palette.background.main : theme.palette.background.default,
        color: theme.palette.gradient.stop03,
      }
    },
    "&:active": {
      cursor: "grabbing !important",
      fallbacks: [{ cursor: "-moz-grabbing !important" }, { cursor: "-webkit-grabbing !important" }],
      transform: "scale(1.08,1.08)",
      "& svg": {
        background: theme.dark() ? theme.palette.background.main : theme.palette.background.default,
        color: theme.palette.gradient.stop03,
      }
    },
  },

  hpContent: {
    display: 'flex',
    zIndex: '1',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
}), { meta: 'SlideToolbar' });

import { makeStyles } from "@material-ui/styles";

export const simpleDeckCardStyles = () => makeStyles((theme) => ({
  title: {
    fontFamily: '"Inter var", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"',
    color: theme.palette.text.primary,
    fontWeight: '600',
    fontFeatureSettings: '"ss03", "cv10"',
  },
  owner: {
    color: theme.palette.text.secondary,
  },
  deckCard: {
    borderRadius: 10,
    padding: "8px 8px 2px 8px",
    overflow: "visible",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    // boxShadow: '0 6px 12px -2px rgba(50,50,90,.1), 0 3px 7px -3px rgba(0,0,0,.1)',
    // backgroundColor: theme.palette.background.elev00,
    backgroundColor: theme.palette.background.main, // new
    '& .textLabel': {
      opacity: '0',
      position: 'relative',
      left: '-4px',
      transition: 'all 0.2s ease-in-out 0.15s',
    },
    '&:hover': {
      '& .textLabel': {
        opacity: '1',
        left: '0',
      },
    },
  },
  deckPreview: {
    borderRadius: 7,
    boxShadow: `${theme.palette.type === "dark" ? "rgb(29 29 31 / 100%) 0px 2px 5px -1px, rgb(29 29 31 / 100%) 0px 1px 3px -1px" : "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px"}`, // new
    border: '0 !important', // new
    margin: '4px 5px 0 5px', // new
    position: 'relative',
    zIndex: 100,
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      height: '0',
    },
  },
  allContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // minHeight: '112px',
    textLabel: {
      opacity: '1',
    },
  },

  focusHighlight: {
    opacity: '0 !important',
    borderRadius: '0 0 6px 6px',
  },

  allContentInner: {
    width: '100%',
  },
  allTitles: {
    width: '100%',
  },
  cardContent: {
    padding: 10,
    margin: "8px 4px 0px 4px",
    borderRadius: 7,
    transition: "background-color 100ms ease-in",
    "&:hover": {
      transition: "background-color 300ms ease-out",
      backgroundColor: theme.dark() ? theme.palette.background.elev02 : theme.palette.background.elev04,
    }
  },
  allActions: {
    margin: '-5px 0px 0 -3px !important',
    width: '100%',
  },
  innerActions: {
    position: "relative",
    boxSizing: 'border-box',
    width: '100%',
    // padding: '0px 12px 10px 12px',
    padding: '0 0 0 5px', // new
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '0 0 6px 6px',
    overflow: 'hidden',
  },
  infoBtn: {
    transition: "all 300ms ease",
    color: theme.palette.icon.primary,
    opacity: '0.5',
    padding: '4px',
    "&:hover": {
      opacity: 1,
      transform: "scale(1.1)",
      color: theme.palette.icon.primaryHover,
      background: theme.palette.icon.primaryHoverBg,
    },
  },
  remixTooltip: {
    top: 6
  },
  active: {
    transition: "all 300ms ease-out",
    boxShadow: theme.dark() ? "inset rgba(0,0,0,0.3) 1px 1px 1px, inset rgba(255,255,255,0.07) -1px -1px 1px" : "inset rgba(50,50,50,0.2) 1px 1px 1px, inset rgba(220,220,220,0.7) -1px -1px 1px",
    backgroundColor: theme.dark() ? `${theme.palette.background.elev02}75` : `${theme.palette.background.elev01}60`,
  }
}));

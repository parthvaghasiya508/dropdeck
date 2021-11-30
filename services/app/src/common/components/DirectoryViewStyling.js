import { makeStyles } from "@material-ui/styles";

const DirectoryViewStyling = () => makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    padding: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    background: theme.palette.background.main,
    margin: '0 auto',
  },
  toolbarMenu: {
    marginLeft: 'auto',
  },
  line: {
    marginLeft: -48,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(-2),
    },
    position: "fixed",
    width: '100vw',
    height: 2,
    background: 'linear-gradient(45deg, rgb(254 99 76) 20%, rgb(240 87 124) 40%, rgb(251 104 96) 55%, rgb(254 202 57) 70%, rgb(255 143 71) 110%)',
    boxShadow: 'inset 0px -12px 12px -12px rgb(80 0 0 / 0.1)',
    zIndex: 1000
  },
  subnav: {
    width: '100vw',
    fontSize: '15px',
    fontWeight: '500',
    position: 'fixed',
    zIndex: 1000,
    // background: 'linear-gradient(45deg, rgb(254 99 76) 20%, rgb(240 87 124) 40%, rgb(251 104 96) 55%, rgb(254 202 57) 70%, rgb(255 143 71) 110%)',
    // boxShadow: 'inset 0px 2px 2px 2px rgb(80 0 0 / 0.1)',
    background: `${theme.palette.type === "dark" ? "rgb(50 50 52 / 90%)" : "rgb(237 237 239 / 92%)"}`,
    backdropFilter: 'blur(15px) saturate(1.5)',
    padding: '10px 48px',
    marginTop: '2px',
    marginLeft: -48,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(-2),
      padding: `10px ${theme.spacing(2)}px 10px ${theme.spacing(2)}px`
    },
    boxSizing: 'border-box',
  },

  tabs: {
    opacity: 0.8,
    color: theme.palette.text.primary,
    margin: 0,
    marginLeft: -46,
    padding: 0,
    minHeight: 38
  },

  tab: {
    margin: 8,
    marginTop: 6,
    boxShadow: `${theme.palette.type === "dark" ? "inset 0px 1px 0px rgba(255,255,255,10%), 0px 1px 0px rgba(255,255,255,10%)" : "inset 0px 1px 2px rgb(0 0 0 / 6%), 0px 1px 0px rgb(255 255 255 / 50%), 0px -1px 0px rgb(255 255 255 / 50%)"}`,
    border: `1px solid ${theme.palette.type === "dark" ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.075)"}`,
    borderRadius: 7,
    marginRight: 6,
    padding: "4px 18px",
    minWidth: 100,
    minHeight: 38,
    textTransform: "unset",
    fontWeight: 500,
    // color: '#fff',
    background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0.025)"}`,
    transition: "all 200ms ease-in",
    opacity: 1,
    "&:hover": {
      transition: "all 200ms ease-in",
      background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)"}`,
    },
    "&:active": {
      boxShadow: "none",
      background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,1)"}`,
      color: `${theme.palette.type === "dark" ? "#fff" : theme.palette.primary.main}`,
    },
  },

  tabLabel: {
    minHeight: 0,
    fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
    letterSpacing: '-0.01em',
  },

  tabsScrollButtons: {
    marginTop: 6,
    height: 38,
    minHeight: 38,
  },

  tabSelected: {
    background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,1)"}`,
    border: `1px solid ${theme.palette.type === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)"}`,
    color: `${theme.palette.type === "dark" ? "#fff" : theme.palette.primary.main}`,
    boxShadow: `${theme.palette.type === "dark" ? "inset 0px 1px 2px 0px rgba(0,0,0,30%), 0px 1px 0px 0px rgba(255,255,255,8%)" : "inset 0px 1px 0px rgba(255,255,255,5%), 0px 1px 0px rgba(255,255,255,5%)"}`,
    "&:hover": {
      background: `${theme.palette.type === "dark" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,1)"}`,
    },
  },

  tabIndicator: {
    display: "none"
  },

  subnavInner: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  cta: {
    margin: 6,
    marginRight: 0,
    position: 'relative',
    zIndex: 1,
    borderRadius: '6px',
    color: "#fff",
    textShadow: '0 1px 1px rgba(0,0,0,0.15)',
    fontWeight: '600',
    backgroundColor: '#f31138',
    background: 'linear-gradient(top,#db1b38, #b80e29)',
    boxShadow: '0px 1px 1px 0px rgba(0,0,0,.08), 0px 2px 3px 0px rgba(0,0,0,.08)',
    fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
    borderColor: 'transparent',
    textTransform: 'none',
    letterSpacing: '0',
    transition: 'all 0.2s ease-in-out 0s',
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: '-1',
      display: 'block',
      backgroundColor: '#f31237',
      background: 'linear-gradient(top,#ff4261 0%,#f31237 5%)',
      boxShadow: 'inset 0px -1px 2px 0px rgba(0,0,0,.1), inset 0px -1px 1px 0px rgba(0,0,0,.1)',
      backgroundRepeat: 'repeat-x',
      borderRadius: '5px',
      top: '1px',
      bottom: '1px',
      left: '1px',
      right: '1px',
    },
    // hover
    '&:hover': {
      backgroundColor: '#f31138',
      background: 'linear-gradient(top,#db1b38, #b80e29)',
      boxShadow: '0px 1px 1px 0px rgba(0,0,0,.08), 0px 1px 2px 0px rgba(0,0,0,.08)',
      borderColor: 'transparent',
      '&:before': {
        background: 'linear-gradient(top,#ff3556 0%,#ff2549 10%)',
        boxShadow: 'inset 0px -1px 2px 0px rgba(0,0,0,.1), inset 0px -1px 1px 0px rgba(0,0,0,.1)',
      },
    },
    // active
    '&:active, &:active:hover, &:focus': {
      background: 'linear-gradient(top,#ffd260a6,#fec43b8c)',
      boxShadow: 'none',
      color: "#ffffffdd",
      top: '1px',
      '&:before': {
        background: 'linear-gradient(-180deg,#db1b38 0%,#db1b38 100%)',
        boxShadow: 'inset 0px 1px 1px 0px rgb(199 28 54), inset 0px 0px 1px 1px rgb(183 24 47), inset 0px 2px 2px 0px rgb(195 21 46)',
      },
    },
    [theme.breakpoints.down('sm')]: {
      "& span.full": {
        display: "none"
      }
    },
  },

}));
export default DirectoryViewStyling;

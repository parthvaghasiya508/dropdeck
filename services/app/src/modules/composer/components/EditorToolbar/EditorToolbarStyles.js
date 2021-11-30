import { makeStyles } from "@material-ui/styles";
import LogoDark from "../../../../common/components/dropdeck-logo-light.png";
import LogoLight from "../../../../common/components/dropdeck-logo-dark.png";

const dimensions = {
  md: {
    blockFormattingMenu: 75,
    dropdownArrow: 20,
  },
  sm: {
    blockFormattingMenu: 70,
    dropdownArrow: 20,
  }
};

export const EditorToolbarStyles = () => makeStyles((theme) => ({
  root: {
    MozUserSelect: 'none',
    OUserSelect: 'none',
    KhtmlUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
    backgroundColor: theme.palette.background.elev01,
    boxShadow: `${theme.palette.type === "dark" ? "rgba(0, 0, 0, 0.5) 0px 6px 13px -8px, rgba(0, 0, 0, 0.85) 0px 4px 8px -8px, rgba(0, 0, 0, 0.02) 0px -3px 8px -6px" : "rgb(50 50 93 / 25%) 0px 2px 5px -1px, rgb(0 0 0 / 30%) 0px 1px 3px -1px"}`,
    borderStyle: 'solid',
    borderTopWidth: '1px',
    borderBottomWidth: `${theme.palette.type === "dark" ? "1px" : "0"}`,
    borderLeftWidth: `${theme.palette.type === "dark" ? "1px" : "0"}`,
    borderRightWidth: `${theme.palette.type === "dark" ? "1px" : "0"}`,
    borderColor: `${theme.palette.type === "dark" ? theme.palette.background.border00 : theme.palette.label.light}`,
    borderBottomColor: theme.palette.background.border01,
    borderRadius: 6,
    padding: "0em 0 1em 16px",
    alignItems: "center",
    zIndex: 1100,
    position: "absolute",
    margin: '0',
    top: '16px',
    left: '-16px',
    right: '0px',
    height: '83px',
    [theme.breakpoints.down('xs')]: {
      height: 'unset',
      top: '0',
      left: '0',
      right: '0',
      position: "fixed",
      width: "100%",
      borderRadius: "unset",
      margin: "0",
      border: "none",
      boxShadow: "none",
      borderBottom: `1px solid ${theme.palette.background.border04}`,
    },
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },

  logo: {
    marginLeft: -5,
    marginRight: 15,
    display: "block",
    opacity: theme.dark() ? 0.8 : 1,
    transform: "scale(1)",
    "&:hover": {
      opacity: 1,
      transform: "scale(1.05)",
      transition: "transform 100ms ease"
    },
    backgroundImage: `url(${theme.dark() ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 81,
    height: 17,
    width: 81,
    marginBottom: "-2px",
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  homeIcon: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    marginRight: 6,
    marginLeft: -7,
    padding: '4px',
    "& svg": {
      transition: 'all 150ms ease-in-out 25ms !important',
      color: theme.palette.icon.primary,
    },
    "&:hover": {
      transform: "scale(1.1)",
      "& svg": {
        color: theme.palette.icon.primaryHover,
      },
    },
  },
  deckNameOuter: {
    flex: 1,
    '& > div > div > div': {
      width: '100%',
    },
  },
  statusContainer: {
    paddingTop: 5,
    marginLeft: 18,
    marginRight: 18,
    opacity: 0.85,
    width: '1.4rem',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 4,
      marginLeft: 12,
      marginRight: 6,
    },
  },
  support: {
    opacity: 1,
    marginTop: 1,
    marginRight: 8,
    transition: 'all 150ms ease-in-out 25ms',
    width: '1.65rem',
    "& svg": {
      color: theme.palette.icon.primary,
    },
    "&:hover": {
      "& svg": {
        transform: "scale(1.1)",
        color: theme.palette.icon.primaryHover,
        background: theme.palette.icon.primaryHoverBg,
        borderRadius: '50%',
      },
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 5,
      marginLeft: 2,
    },
  },

  buttonGroup: {
    marginRight: 8,
    [theme.breakpoints.down('sm')]: {
      marginRight: 5,
    },
    '& *': {
      transition: 'all 200ms ease-in-out 0',
    },
  },

  // All Buttons container
  controls: {
    margin: 0,
    display: "flex",
    alignItems: "flex-start", 

    // Buttons
    "& div.MuiToggleButtonGroup-root, & div.MuiButtonGroup-root": {
      zIndex: 1,
      "& :not(:last-child)": {
        borderRight: "none",
      },
      "& button": {
        borderColor: theme.palette.background.border01,
        backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop01} 3%, ${theme.palette.gradient.stop02} 100%)`,
        height: 30,
        width: 32,
        "&:hover": {
          backgroundImage: `linear-gradient(0deg, ${theme.palette.gradient.stop01} 0%, ${theme.palette.gradient.stop02} 50%)`,
          "& *": {
            color: theme.palette.text.primary,
          },
        },
        [theme.breakpoints.down('lg')]: { width: 30 },
        [theme.breakpoints.down('md')]: { width: 37 },
        [theme.breakpoints.down('sm')]: { width: 29 },
        [theme.breakpoints.down('xs')]: { width: 35 },
      },

      "& svg": {
        color: theme.palette.text.secondary,
        fontSize: "1.125em"
      },

      "& button.primaryBlockIcon:nth-of-type(2) svg": {
        transform: "scale(0.84)",
        paddingTop: 1,
      },

      "& .Mui-selected, & .Mui-selected:hover": {
        background: theme.palette.button.selected,
      },

      "& .Mui-selected svg": {
        color: theme.palette.text.primary,
      },

      "& .Mui-disabled": {
        background: theme.palette.button.disabled,
        "& svg": {
          opacity: theme.dark() ? '0.25' : '0.375',
        },
        "& .MuiButton-label": {
          opacity: theme.dark() ? '0.25' : '0.375',
        },
      },

      // Downward arrow
      "& button.dropdownArrow": {
        width: dimensions.md.dropdownArrow,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },

      // title / sub / para dropdown
      "& button.blockTypes": {
        width: dimensions.md.blockFormattingMenu,
        minWidth: dimensions.md.blockFormattingMenu,
        [theme.breakpoints.down('sm')]: {
          width: dimensions.sm.blockFormattingMenu,
          minWidth: dimensions.sm.blockFormattingMenu,
        },
        "& span": {
          textTransform: 'none',
          position: 'absolute',
        }
      }

    },
  },

  // 
  styleMenu: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.background.border00,
    borderRadius: 4,
    marginTop: '0', // 4 **
    fontSize: "0.9em",
    '& li:first-of-type': {
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    '& li:last-of-type': {
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
    '& .MuiTypography-body2': {
      fontSize: '0.9em',
    },
    "& .Mui-selected, & .Mui-selected:hover": {
      background: theme.palette.button.selected,
    },
    "& svg": {
      color: theme.palette.text.secondary,
      fontSize: "0.9em",
    },
    '& .MuiListItem-gutters': {
      paddingLeft: 8,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 25,
      marginLeft: '-3px',
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: 0,
    },

    // Menu divider:
    "& .MuiDivider-root": {
      background: theme.palette.background.border05,
      position: 'relative',
      top: '-1px',
      marginBottom: '-2px',
      zIndex: '4',
    },
  },

  // Dropdown Outer
  blockFormattingMenu: {
    width: (dimensions.md.blockFormattingMenu + dimensions.md.dropdownArrow),
    // [theme.breakpoints.down('sm')]: {
    //   width: (dimensions.sm.blockFormattingMenu + dimensions.sm.dropdownArrow),
    // },
  }

}), { meta: 'EditorToolbar' });
export default EditorToolbarStyles;

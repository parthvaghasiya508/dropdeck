import { makeStyles } from "@material-ui/styles";

export const suggestionsStyles = () => makeStyles((theme) => ({
  context: {
    opacity: 1,
    // borderRadius: `4px !important`,
    // color: theme.palette.primary.contrastText,
    // backgroundColor: theme.dark() ? theme.palette.background.elev00 : theme.palette.background.elev02,
    "& .context svg": {
      color: theme.palette.primary.main
    },
  },
  options: {
    color: theme.palette.primary.main,
  },
  root: {
    borderRadius: `4px !important`,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.elev01,
    border: `1px solid ${theme.palette.background.elev00}`,
    transition: 'all 300ms ease-in-out 0',
    "& .suggestions": {
      border: `1px solid transparent`,
      background: 'transparent',
    },
    "& .suggestions.active": {
      color: "#06a1ec",
      borderRadius: `4px !important`,
      backgroundColor: theme.dark() ? theme.palette.background.elev00 : theme.palette.background.elev02,
      "& svg:last-of-type": {
        color: theme.palette.secondary.main,
      },
      "& .synonym + .label": {
        border: `1px solid #06a1ec`,
        color: theme.palette.secondary.main,
      }
    },
    "& .synonym + .label": {
      border: `1px solid ${theme.palette.text.secondary}`,
      "& .active": {
        color: theme.palette.secondary.main,
        border: `1px solid #06a1ec`,
      }
    }
  },
  boundary: {
    opacity: 0.7,
    "& div.boundary-line": {
      borderTop: `1px solid`,
      borderColor: theme.dark() ? theme.palette.background.border03 : theme.palette.background.elev02,
      height: 1
    },
    padding: 14
  }
}), { meta: 'Suggestions' });

import { makeStyles } from "@material-ui/styles";

export const slideElementStyles = () => makeStyles((theme) => ({
  interSlideButtons: {
    lineHeight: 0,
    padding: 4,
  },
  button: {
    background: theme.dark() ? "#2e2e2e" : "#e7eaed",
    color: theme.palette.icon.primary,
    "&:hover": {
      color: theme.palette.icon.primaryHover,
    },
    "& svg": {
      height: 14,
      width: 14
    }
  },
}));

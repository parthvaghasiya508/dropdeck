import { makeStyles } from "@material-ui/styles";

export const smartPasteStyles = () => makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    color: theme.palette.popover.label,
    fontSize: 12,
  },
}));

import { makeStyles } from "@material-ui/styles";

export const contextMenuStyles = () => makeStyles((theme) => ({
  context: {
    opacity: 1,
    "& .context svg": {
      color: theme.palette.primary.main
    },
  },
}));

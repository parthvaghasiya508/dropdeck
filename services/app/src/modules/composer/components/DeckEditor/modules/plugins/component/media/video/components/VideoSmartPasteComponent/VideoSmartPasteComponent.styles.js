import { makeStyles } from "@material-ui/styles";

export const videoSmartPasteComponentStyles = () => makeStyles((theme) => ({
  loadingSpinner: {
    margin: '1rem 0',
  },
  tabList: {
    color: theme.palette.popover.label,
  },
}));

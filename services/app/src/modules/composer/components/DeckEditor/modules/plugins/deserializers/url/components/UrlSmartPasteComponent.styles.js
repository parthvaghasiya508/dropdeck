import { makeStyles } from "@material-ui/styles";
import Colors from "../../../../../../../../../Colors";

export const urlSmartPasteComponentStyles = (url) => makeStyles((theme) => ({
  loadingSpinner: {
    margin: '1rem 0',
  },
  ExtractTabList: {
    color: theme.palette.popover.label,
  },
  LinkExtract: {
    color: theme.palette.popover.label,
  },

}));

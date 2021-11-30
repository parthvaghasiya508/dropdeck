import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { Node as SlateNode, Path, Text } from "slate";
import { hasActivePrompt } from "../modules/prompt/transforms/hasActivePrompt";
import { isPlainText } from "../modules/plugins/deserializers/transforms/isPlainText";
import { SelectionTransforms } from "../services/transforms/SelectionTransforms";

const styles = () => makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "block",
    fontSize: "0.8em",
    marginLeft: 15,
    top: -2,
    letterSpacing: 0.1,
    "& strong": {
      margin: 2,
      color: theme.dark() ? "#ffffff" : theme.palette.text.primary,
      display: "inline"
    }
  }
}), { meta: 'PlaceHolder' });

const Placeholder = ({ promptSession, editor }) => {
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();
  let [element, path] = SlateNode.first(editor, []);
  if (element && Text.isText(element)) {
    path = Path.parent(path);
    element = SlateNode.get(editor, path);
  }
  const isBeingConfigured = hasActivePrompt(element, path, promptSession);
  const isTextElement = element !== undefined && SelectionTransforms.isComponentElementPath(editor, path) && isPlainText(element);

  return isTextElement && !isBeingConfigured ? (
    <div className={classes.root}>
      ...try typing &lsquo;<strong>image</strong>&rsquo;, or hit &lsquo;<strong>/</strong>&rsquo; for more options!
    </div>
  ) : null;
};
export default Placeholder;

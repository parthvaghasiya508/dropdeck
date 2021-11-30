import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { logger } from "../../../../../common/util/logger";
import Dropdeck from "../../../../../common/api/sdk/Dropdeck";
import { EditorTransforms } from "../services/transforms/EditorTransforms";

const styles = () => makeStyles((theme) => ({
  root: {
    userSelect: "none",
    opacity: 0,
    "&.fadeIn": {
      transition: "opacity 1000ms ease",
      opacity: theme.dark() ? '0.8' : '0.6',
    },
    transform: "scale3d(1,1,1)",
    transition: "opacity 300ms ease, transform 600ms ease",
    "&:hover": {
      opacity: 1,
      transform: "scale3d(1.03,1.03,1.03)",
      transition: "opacity 300ms ease, transform 600ms ease",
    },
    position: 'relative',
    textAlign: "center",
    bottom: "55%",
    zIndex: 10,
    margin: '0 auto',
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    color: theme.palette.text.secondary,
    textShadow: theme.dark() ? '0 1px 0 rgba(0,0,0,0.9)' : '0 1px 0 rgba(255,255,255,0.6)',
    "& h5": {
      margin: 0,
      marginBottom: 6,
      fontWeight: '600',
      lineHeight: "1.65",
    },
    "& button": {
      color: theme.palette.secondary.main,
      fontWeight: '500',
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    }
  },

}));
const Inspiration = ({ overrideDeck, show, setShow, editor, contentState }) => {

  const [tags, setTags] = useState("sample");
  const [fadeIn, setFadeIn] = useState(false);
  const [delay, setDelay] = useState();
  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  // Only show if no decision has been taken by composer.
  useEffect(() => {
    const empty = EditorTransforms.isEmpty(editor);
    if (empty) {
      Dropdeck.api.get("inspiration")
        .then((payload) => {
          setTags(payload.data);
          if (delay) {
            clearTimeout(delay);
          }
          setDelay(setTimeout(() => {
            setShow(true);
            setTimeout(() => setFadeIn(true), 200);
          }, 1000));
        }).catch((e) => logger.error(e));
    } else {
      if (delay) {
        clearTimeout(delay);
      }
      setFadeIn(false);
      setTimeout(() => setShow(false), 750);
    }
  }, [contentState]);

  const getSample = (tag) => {
    Dropdeck.api.get(`inspiration/${tag}`)
      .then((payload) => {
        overrideDeck(payload);
        setShow(false);
      })
      .catch((e) => logger.error(e));
  };

  if (!show) {
    return null;
  }

  return tags ? (
    <div className={`${classes.root} ${fadeIn ? "fadeIn" : ""}`} contentEditable={false}>
      <EmojiObjectsIcon style={{ marginBottom: 10 }}/>
      <h5>Need some inspiration?<br/>Try:</h5>
      <div style={{ width: "30%" }}>
        {tags.map((tag) => <Button key={`inspiration-${tag}`} variant="text" onClick={() => getSample(tag)}>#{tag}</Button>)}
      </div>
    </div>
  ) : null;
};
export default Inspiration;

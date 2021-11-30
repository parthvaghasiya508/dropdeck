import React, { useCallback } from 'react';
import { useTheme } from "@material-ui/core";

import GiphyLogoDark from "./PoweredBy_200px-Black_HorizText.png";
import GiphyLogo from "./PoweredBy_200px-White_HorizText.png";

import { mediaFooterStyles } from "../../../components/mediaFooter.styles";

export const GiphyFooter = () => {
  const appTheme = useTheme();
  const useStyles = useCallback(mediaFooterStyles(), []);
  const classes = useStyles();

  return (
    <div className={classes.attribution}>
      <a href="https://giphy.com/" target="_new"><img className="logo" alt="Giphy logo" src={appTheme.dark() ? GiphyLogoDark : GiphyLogo} /></a>
    </div>
  );
};

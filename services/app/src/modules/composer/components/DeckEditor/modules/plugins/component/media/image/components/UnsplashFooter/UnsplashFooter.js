import React, { useCallback } from 'react';
import { useTheme } from "@material-ui/core";

import UnsplashLogoDark from "./logo-unsplash-dark.svg";
import UnsplashLogo from "./logo-unsplash.svg";
import { mediaFooterStyles } from "../../../components/mediaFooter.styles";

export const UnsplashFooter = () => {
  const appTheme = useTheme();
  const useStyles = useCallback(mediaFooterStyles(), []);
  const classes = useStyles();

  return (
    <div className={classes.attribution}>
      Photos by
      <a href="https://unsplash.com/" target="_new"><img className="logo" alt="Unsplash logo" src={appTheme.dark() ? UnsplashLogoDark : UnsplashLogo} /></a>
    </div>
  );
};

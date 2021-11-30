import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { usePreference, UserPreferencesContext } from "./common/api/sdk/hooks/PreferenceHooks";
import AppTheme from "./AppTheme";

const ThemeWrapper = ({ children }) => {

  const [lightingMode] = usePreference("lighting-mode");

  return (
    <ThemeProvider theme={AppTheme(lightingMode)}>
      {children}
    </ThemeProvider>
  );
};
export default ThemeWrapper;

import React from "react";
import Typography from "@material-ui/core/Typography";
import AppNavigationLink from "./AppNavigationLink";
import { ROUTE_HOME, ROUTE_MEDIA } from "../../../../../Routes";

const AppNavigation = () => (
  <Typography>
    <AppNavigationLink to={ROUTE_HOME} label="Decks"/>
    <AppNavigationLink to={ROUTE_MEDIA} label="Media"/>
  </Typography>
);
export default AppNavigation;

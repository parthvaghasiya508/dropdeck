import React from "react";
import PlaceRoundedIcon from "@material-ui/icons/PlaceRounded";
import { renderElementMap } from "./renderElementMap";
import { renderElementWithGutter } from "../../../../gutter/renderElementWithGutter";
import { MapSlideComponent } from "./components/MapSlideComponent";
import { mapConfigurator } from "./configuration/mapConfigurator";
import { promptForLocation } from "./configuration/promptForLocation";
import { MAP } from "./type";

const ICON = <PlaceRoundedIcon />;
export const MapPlugin = (suggestionControls) => ({
  type: MAP,
  editorComponent: renderElementWithGutter(renderElementMap, ICON),
  keywords: 'map',
  name: 'map',
  description: 'Insert a static Google map',
  slideComponent: MapSlideComponent,
  configuration: {

    // Configuration workflow
    workflow: promptForLocation,

    // Turn the user's inputs into Slate elements: (data) => configurator
    builder: mapConfigurator,
  },
  icon: ICON,
  isVoid: true,
  styling: {
    width: '100%',
    height: '100%', // important for default image heights, but remove this during remixes for safari
    padding: '0',
    overflow: 'hidden',
  }
});

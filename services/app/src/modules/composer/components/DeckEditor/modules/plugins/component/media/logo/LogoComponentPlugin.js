import React from "react";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { renderElementLogo } from "./renderElementLogo";
import { LogoSlideComponent } from "./components/LogoSlideComponent";
import { promptForCompany } from "./configuration/promptForCompany";
import { logoConfigurationBuilder } from "./configuration/logoConfigurationBuilder";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { SLIDE } from "../../slide/type";
import { LOGO } from "./type";
import { logoBuilder } from "./logoBuilder";

const ICON = <PhotoLibraryIcon/>;

export default class LogoComponentPlugin extends ComponentPlugin {
  constructor() {
    super({
      type: LOGO,
      editorComponent: renderElementLogo,
      slideComponent: LogoSlideComponent,
      metadata: {
        name: 'logo',
        keywords: 'logo',
        description: 'Display a single logo',
      },
      isVoid: true,
      configuration: {

        // Configuration workflow
        workflow: promptForCompany,

        // Turn the user's inputs into Slate elements: (data) => configurator
        builder: logoConfigurationBuilder,
      },
      builder: logoBuilder,
      icon: ICON,
      canBeChildOf: (parent) => parent.type === SLIDE,
      styling: {
        '& .element': {
          width: '100%',
          height: '100%',
        },
        '& .imgWrap.opaqueBg': {
          borderRadius: '0.25em',
          padding: '1em',
        },
        '& img': {
          maxHeight: '15em',
        },
      }
    });
  }
}

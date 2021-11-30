import React from "react";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { LogoListSlideComponent } from "./components/LogoListSlideComponent";
import { renderElementLogoList } from "./renderElementLogoList";
import { onKeyDownLogoList } from "./onKeyDownLogoList";
import { decorateLogoDomain } from "./decorateLogoDomain";
import { renderLeafWithCapsule } from "./renderLeafWithCapsule";
import { logoListConfigurator } from "./logoListConfigurator";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { LOGO_LIST } from "./type";

const ICON = <PhotoLibraryIcon/>;

export default class LogoListComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: LOGO_LIST,
      editorComponent: renderElementLogoList,
      slideComponent: LogoListSlideComponent,
      icon: ICON,
      metadata: {
        name: 'logo list',
        keywords: 'logos,logo grid',
        categories: [ComponentPlugin.Category.LIST],
        description: 'Multiple logos in a grid',
      },
      onKeyDown: onKeyDownLogoList,
      configuration: logoListConfigurator,
      decorate: decorateLogoDomain(),
      renderLeaf: renderLeafWithCapsule,
    });
  }
}

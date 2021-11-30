import React from "react";
import GifIcon from '@material-ui/icons/Gif';
import { renderElementGiphy } from "./renderElementGiphy";
import { GiphySlideComponent } from "./components/GiphySlideComponent";
import { promptForImageSelection } from "./configuration/promptForImageSelection";
import { promptForQuery } from "./configuration/promptForQuery";
import { giphyConfigurationBuilder } from "./configuration/giphyConfigurationBuilder";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { SLIDE } from "../../slide/type";
import { GIPHY } from "./type";
import { giphyBuilder } from "./giphyBuilder";

const ICON = <GifIcon />;

export default class GiphyComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: GIPHY,
      icon: ICON,
      editorComponent: renderElementGiphy,
      slideComponent: GiphySlideComponent,
      metadata: {
        name: 'giphy',
        keywords: 'gif,giphy,image,picture',
        description: 'Find fun Giphy animations.',
      },
      isVoid: true,
      builder: giphyBuilder,
      canBeChildOf: (parent) => parent.type === SLIDE,
      configuration: {

        // Configuration workflow
        workflow: promptForQuery.then(promptForImageSelection),

        // Turn the user's inputs into Slate elements: (data) => configurator
        builder: giphyConfigurationBuilder,
      },
    });
  }
}

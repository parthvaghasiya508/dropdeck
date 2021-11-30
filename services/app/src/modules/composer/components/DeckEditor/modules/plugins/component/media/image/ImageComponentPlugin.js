import React from "react";
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import { renderElementImage } from "./renderElementImage";
import { ImageSlideComponent } from "./components/ImageSlideComponent";
import { imageConfigurationBuilder } from "./configuration/imageConfigurationBuilder";
import { deserializeImage } from "./deserializeImage";
import { Ranking } from "../../Ranking";
import { promptForImageSelection } from "./configuration/promptForImageSelection";
import { promptForQuery } from "./configuration/promptForQuery";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { SLIDE } from "../../slide/type";
import { IMAGE } from "./type";
import { isImageUrl } from "./queries/isImageUrl";
import { ImageSmartPasteComponent } from "./components/ImageSmartPasteComponent/ImageSmartPasteComponent";
import { imageBuilder } from "./imageBuilder";

const ICON = <ImageRoundedIcon />;

export default class ImageComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: IMAGE,
      icon: ICON,
      editorComponent: renderElementImage,
      slideComponent: ImageSlideComponent,
      metadata: {
        name: 'image',
        keywords: 'image,picture,photo',
        description: 'Search for an image online',
        ranking: Ranking.HIGHEST,
      },
      deserialize: deserializeImage(),
      pasteHandler: {
        matches: (url, contentType) => isImageUrl(url, contentType),
        component: ImageSmartPasteComponent,
      },
      canBeChildOf: (parent) => parent.type === SLIDE,
      isVoid: true,
      builder: imageBuilder,
      configuration: {

        // Configuration workflow
        workflow: promptForQuery.then(promptForImageSelection),

        // Turn the user's inputs into Slate elements: (data) => configurator
        builder: imageConfigurationBuilder,
      },

      styling: {
        width: '100%',
        height: '100%', // important for default image heights, but remove this during remixes for safari
        padding: '0',
        overflow: 'hidden',
        '& .element': {
          width: '100%',
          height: '100%',
        },
      }
    });
  }
}

import React from "react";
import TitleRoundedIcon from "@material-ui/icons/TitleRounded";
import { renderElementHeadingTwo } from "./renderElementHeadingTwo";
import { Ranking } from "../../Ranking";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { HEADING_TWO } from "./type";

const ICON = <TitleRoundedIcon style={{ height: 14 }} />;

export default class HeadingTwoComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: HEADING_TWO,
      icon: ICON,
      editorComponent: renderElementHeadingTwo,
      metadata: {
        name: 'subtitle',
        keywords: 'subtitle,subheading,h2',
        ranking: Ranking.HIGH,
      },
      editable: true,
      styling: {
        margin: '0',
        padding: '0',
      }
    });
  }
}

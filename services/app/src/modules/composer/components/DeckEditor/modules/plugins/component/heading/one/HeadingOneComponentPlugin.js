import React from "react";
import TitleRoundedIcon from "@material-ui/icons/TitleRounded";
import { renderElementHeadingOne } from "./renderElementHeadingOne";
import { Ranking } from "../../Ranking";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { TITLE } from "./type";

const ICON = <TitleRoundedIcon />;

export default class HeadingOneComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: TITLE,
      icon: ICON,
      editorComponent: renderElementHeadingOne,
      metadata: {
        name: 'title',
        keywords: 'title,heading,h1',
        ranking: Ranking.HIGHER,
      },
      editable: true,
      styling: {
        margin: '0',
        padding: '0',
      }
    });
  }
}

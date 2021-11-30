import React from "react";
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import { renderElementBulletedList } from "./renderElementBulletedList";
import { Ranking } from "../../Ranking";
import { componentConfigurator } from "../../componentConfigurator";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { listBuilder } from "../listBuilder";
import { BULLETED_LIST } from "./type";
import { BulletedListSlideComponent } from "./components/BulletedListSlideComponent";
import { bulletedListStyling } from "./bulletedListStyling";
import { BulletedListContextMenu } from "./components/BulletedListContextMenu";

const ICON = <FormatListBulletedRoundedIcon />;

export default class BulletedListComponentPlugin extends ComponentPlugin {
  constructor() {
    const builder = listBuilder(BULLETED_LIST);
    super({
      type: BULLETED_LIST,
      icon: ICON,
      editorComponent: renderElementBulletedList,
      contextMenuComponent: BulletedListContextMenu,
      slideComponent: BulletedListSlideComponent,
      metadata: {
        name: 'bullet list',
        keywords: 'list,bullet list,bullets',
        ranking: Ranking.MEDIUM,
        categories: [ComponentPlugin.Category.LIST, ComponentPlugin.Category.NESTED],
      },
      editable: true,
      configuration: componentConfigurator(builder),
      builder,
      styling: bulletedListStyling(),
    });
  }
}

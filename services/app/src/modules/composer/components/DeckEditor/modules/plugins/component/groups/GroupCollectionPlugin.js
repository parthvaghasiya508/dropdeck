import React from "react";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { componentConfigurator } from "../componentConfigurator";
import { groupCollectionBuilder } from "./groupCollectionBuilder";
import { GROUP_COLLECTION } from "./type";
import { renderElementGroupCollection } from "./renderElementGroupCollection";

const ICON = <GroupWorkIcon />;

// @todo this should not be a component plugin
export default class GroupCollectionPlugin extends ComponentPlugin {

  constructor() {
    const builder = groupCollectionBuilder;
    super({
      type: GROUP_COLLECTION,
      editorComponent: renderElementGroupCollection,
      metadata: {
        name: 'collection',
      },
      editable: true,
      configuration: componentConfigurator(builder),
      showGutter: false,
      builder,
    });
  }
}

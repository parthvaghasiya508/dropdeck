import React from "react";
import ComponentPlugin from "../../../../../../../../../../common/api/plugins/ComponentPlugin";
import { GROUP } from "./type";
import { renderElementGroup } from "./renderElementGroup";

export default class GroupPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: GROUP,
      editable: true,
      editorComponent: renderElementGroup,
      showGutter: false,
    });
  }
}

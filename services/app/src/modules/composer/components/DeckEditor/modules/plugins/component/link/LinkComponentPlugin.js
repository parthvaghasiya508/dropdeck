import React from "react";
import { deserializeLink } from "@udecode/slate-plugins";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { LINK } from "./type";
import { renderElementLink } from "./renderElementLink";

export default class LinkComponentPlugin extends ComponentPlugin {
  constructor() {
    super({
      type: LINK,
      editorComponent: renderElementLink,
      isInline: true,
      deserialize: deserializeLink({ typeLink: LINK }),
    });
  }
}

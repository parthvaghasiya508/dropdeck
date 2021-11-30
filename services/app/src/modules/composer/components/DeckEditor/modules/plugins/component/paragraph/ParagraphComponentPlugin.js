import React from "react";
import { Subject } from "@material-ui/icons";
import { deserializeParagraph, getElementComponent, renderElementParagraph } from "@udecode/slate-plugins";
import { Ranking } from "../Ranking";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { PARAGRAPH } from "./type";

const options = { typeP: PARAGRAPH };
const ICON = <Subject />;

export default class ParagraphComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: PARAGRAPH,
      icon: ICON,
      editorComponent: renderElementParagraph({
        typeP: PARAGRAPH,
        component: getElementComponent('div'),
      }),
      metadata: {
        ranking: Ranking.LOW,
        keywords: 'paragraph,text',
        name: 'normal text',
      },
      command: 'paragraph',
      deserialize: deserializeParagraph(options),
      styling: {
        margin: '0',
        padding: '0',
      }
    });
  }
}

import React from "react";
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import { CodeSlideComponent } from "./components/CodeSlideComponent";
import { deserializeCode } from "./deserializeCode";
import { renderElementCode } from "./renderElementCode";
import { onKeyDownTabIndent } from "./onKeyDownTabIndent";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { CODE } from "./type";

const ICON = <CodeRoundedIcon />;

export default class CodeComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: CODE,
      icon: ICON,
      editorComponent: renderElementCode,
      slideComponent: CodeSlideComponent,
      metadata: {
        name: 'code',
        keywords: 'code',
        description: 'Add HTML styled code snippet',
      },
      onKeyDown: onKeyDownTabIndent(CODE),
      editable: true,
      deserialize: deserializeCode(),
      styling: {
        boxSizing: 'border-box',
        backgroundColor: "#202020",
        width: '100%',
        '& code': {
          color: '#fff',
        },
        padding: '0.05em 1.5em',
        marginTop: "0.25em",
        marginBottom: '1em',
        borderRadius: 6,
      }
    });
  }
}

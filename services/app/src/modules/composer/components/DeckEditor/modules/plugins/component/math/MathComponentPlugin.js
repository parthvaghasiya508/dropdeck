import React from "react";
import MathIcon from '@material-ui/icons/Functions';
import { renderElementMath } from "./renderElementMath";
import { MathSlideComponent } from "./components/MathSlideComponent";
import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { onKeyDownTabIndent } from '../code/onKeyDownTabIndent';
import { MATH } from "./type";

const ICON = <MathIcon />;

export default class MathComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: MATH,
      icon: ICON,
      editorComponent: renderElementMath,
      slideComponent: MathSlideComponent,
      metadata: {
        name: 'math',
        keywords: 'math,formula,equation',
        description: 'Write an equation or formula',
      },
      onKeyDown: onKeyDownTabIndent(MATH),
      editable: true,
      styling: {
        width: '100%',
        // overflow: 'hidden',
        fontSize: '1.75em',
        '& > div': {
          margin: '0 auto',
          '& .katex-display > .katex': {
            boxSizing: 'border-box',
            textAlign: 'left',
          },
        },
        '& h4': {
          border: '0.1em solid',
          borderLeftWidth: '0.5em',
          borderRadius: '0.25em',
          padding: '0.5em 0.5em 0.5em 0.75em',
          fontWeight: '500',
          fontSize: '0.8em',
        },
      }
    });
  }
}

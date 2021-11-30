/** @jsx jsx */

import { Editor, Node } from "slate";
import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <imageElement><text/></imageElement>
      <paragraph><cursor/></paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <imageElement><text><cursor /></text></imageElement>
    </slide>
  </editor>
);

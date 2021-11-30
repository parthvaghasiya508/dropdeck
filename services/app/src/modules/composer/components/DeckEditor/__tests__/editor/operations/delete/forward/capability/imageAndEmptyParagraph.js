/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph><cursor/></paragraph>
      <imageElement><text/></imageElement>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteForward();
};

export const output = (
  <editor>
    <slide>
      <imageElement><text><cursor /></text></imageElement>
    </slide>
  </editor>
);

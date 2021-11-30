/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>Text<cursor/></paragraph>
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
      <paragraph>Text</paragraph>
      <imageElement><text><cursor /></text></imageElement>
    </slide>
  </editor>
);

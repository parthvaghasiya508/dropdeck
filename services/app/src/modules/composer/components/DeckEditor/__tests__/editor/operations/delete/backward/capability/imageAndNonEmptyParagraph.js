/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <imageElement><text/></imageElement>
      <paragraph><cursor/>Text</paragraph>
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
      <paragraph>Text</paragraph>
    </slide>
  </editor>
);

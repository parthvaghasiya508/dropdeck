/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <math>f<cursor/></math>
      <paragraph>(x)</paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteForward();
};

export const output = (
  <editor>
    <slide>
      <math>f<cursor/>(x)</math>
    </slide>
  </editor>
);

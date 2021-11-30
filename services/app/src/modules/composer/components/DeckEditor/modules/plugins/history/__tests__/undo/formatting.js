/** @jsx jsx */

import { jsx } from '../index';

export const input = (
  <editor>
    <slide>
      <paragraph>Paragraph</paragraph>
      <math><cursor/></math>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <paragraph>Paragraph</paragraph>
      <math><cursor/></math>
    </slide>
  </editor>
);

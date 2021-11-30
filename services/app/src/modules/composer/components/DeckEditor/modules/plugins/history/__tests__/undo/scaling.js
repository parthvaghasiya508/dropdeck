/** @jsx jsx */

import { jsx } from '../index';

export const input = (
  <editor>
    <slide>
      <paragraph>Paragraph</paragraph>
      <paragraph><cursor/></paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  // Let's make a change (delete). This should only count as a
  // SINGLE user operation and therefore, a single UNDO should reset back to the original input,
  // without affecting the auto-scaling.
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <paragraph>Paragraph</paragraph>
      <paragraph><cursor/></paragraph>
    </slide>
  </editor>
);

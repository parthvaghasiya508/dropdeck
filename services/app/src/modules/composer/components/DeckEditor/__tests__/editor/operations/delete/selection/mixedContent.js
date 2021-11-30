/** @jsx jsx */

import { jsx } from '../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        <anchor/>
        Heading
      </paragraph>
      <paragraph>Text</paragraph>
      <paragraph>
        f(x)
        <focus/>
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteFragment();
};

export const output = (
  <editor>
    <slide>
      <paragraph><cursor/></paragraph>
    </slide>
  </editor>
);

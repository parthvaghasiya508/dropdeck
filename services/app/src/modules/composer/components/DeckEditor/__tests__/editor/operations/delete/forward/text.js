/** @jsx jsx */

import { jsx } from '../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        <cursor />
        a
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteForward();
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

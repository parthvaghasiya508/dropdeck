/** @jsx jsx */

import { jsx } from '../../index';

export const input = (
  <editor>
    <slide>
      <text>
        <cursor />
      </text>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.normalizeNode([editor, []]);
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        <text />
      </paragraph>
    </slide>
  </editor>
);

/** @jsx jsx */

import { jsx } from '../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.splitSlide({ at: [0, 0] });
};

export const output = (
  <editor>
    <slide>
      <paragraph><text /></paragraph>
    </slide>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

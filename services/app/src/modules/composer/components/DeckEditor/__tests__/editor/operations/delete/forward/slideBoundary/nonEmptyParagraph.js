/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        First slide
        <cursor />
      </paragraph>
    </slide>
    <slide>
      <paragraph>
        Second slide
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
        First slide
        <cursor />Second slide
      </paragraph>
    </slide>
  </editor>
);

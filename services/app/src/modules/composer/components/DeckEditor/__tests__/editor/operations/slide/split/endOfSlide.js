/** @jsx jsx */

import { jsx } from '../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        <text>Some text</text>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.splitSlide();
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        Some text
      </paragraph>
    </slide>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

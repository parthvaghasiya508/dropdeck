/** @jsx jsx */

import { jsx } from '../../../index';

export const input = (
  <editor>
    <slide>
      <title>
        <cursor />This is a title
      </title>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.insertBreak();
};

export const output = (
  <editor>
    <slide>
      <title>
        <text />
      </title>
      <title>
        <cursor />This is a title
      </title>
    </slide>
  </editor>
);

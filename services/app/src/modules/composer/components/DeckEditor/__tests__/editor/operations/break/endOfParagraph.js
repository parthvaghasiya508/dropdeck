/** @jsx jsx */

import { jsx } from '../../../index';

export const input = (
  <editor>
    <slide>
      <title>
        This is a title<cursor />
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
        This is a title
      </title>
      <paragraph>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

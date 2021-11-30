/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        First slide
      </paragraph>
    </slide>
    <slide>
      <paragraph>
        <cursor />Second slide
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        First slide<cursor />Second slide
      </paragraph>
    </slide>
  </editor>
);

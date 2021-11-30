/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <math>
        f(x)
        <cursor/>
      </math>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <math>
        f(x
        <cursor/>
      </math>
    </slide>
  </editor>
);

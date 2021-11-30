/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <math>
        <cursor/>
        f(x)
      </math>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteForward();
};

export const output = (
  <editor>
    <slide>
      <math>
        <cursor/>
        (x)
      </math>
    </slide>
  </editor>
);

/** @jsx jsx */

import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <collection>
        <group>
          <paragraph><cursor /></paragraph>
        </group>
      </collection>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <paragraph><text /></paragraph>
    </slide>
  </editor>
);

/** @jsx jsx */

import { Transforms } from 'slate';
import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <bulletedList>
        <li>
          <paragraph>
            Item
            <cursor />
          </paragraph>
        </li>
      </bulletedList>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteBackward();
};

export const output = (
  <editor>
    <slide>
      <bulletedList>
        <li>
          <paragraph>
            Ite
            <cursor />
          </paragraph>
        </li>
      </bulletedList>
    </slide>
  </editor>
);

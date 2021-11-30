/** @jsx jsx */

import { Transforms } from 'slate';
import { jsx } from '../../../../../index';

export const input = (
  <editor>
    <slide>
      <bulletedList>
        <li>
          <paragraph>
            <cursor />
            Item
          </paragraph>
        </li>
      </bulletedList>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.deleteForward();
};

export const output = (
  <editor>
    <slide>
      <bulletedList>
        <li>
          <paragraph>
            <cursor />
            tem
          </paragraph>
        </li>
      </bulletedList>
    </slide>
  </editor>
);

/** @jsx jsx */

import { jsx } from '../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  const data = {
    getData: (type) => (type === 'text/plain' ? '' : undefined),
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
    </slide>
  </editor>
);

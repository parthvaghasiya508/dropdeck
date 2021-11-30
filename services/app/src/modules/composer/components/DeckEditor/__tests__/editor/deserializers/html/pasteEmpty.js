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
    getData: (mimeType) => (mimeType === 'text/html' ? '<html></html>' : undefined),
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

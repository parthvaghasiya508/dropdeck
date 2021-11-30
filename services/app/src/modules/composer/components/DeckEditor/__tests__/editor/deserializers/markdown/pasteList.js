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
    getData: (type) => (type === 'text/plain' ? (
      '# List\n' +
      '* A\n' +
      '* B\n') : null)
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <title>List</title>
      <bulletedList>
        <li><paragraph>A</paragraph></li>
        <li><paragraph>B<cursor/></paragraph></li>
      </bulletedList>
    </slide>
  </editor>
);

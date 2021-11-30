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
      '  * A1\n' +
      '  * A2\n' +
      '* B\n') : null)
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <title>List</title>
      <bulletedList>
        <li>
          <paragraph>A</paragraph>
          <bulletedList>
            <li><paragraph>A1</paragraph></li>
            <li><paragraph>A2</paragraph></li>
          </bulletedList>
        </li>
        <li><paragraph>B<cursor/></paragraph></li>
      </bulletedList>
    </slide>
  </editor>
);

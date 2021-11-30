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
      '# Slide 1\n' +
      'Paragraph\n' +
      '```\n' +
      'Code\n' +
      '```\n\n' +
      '---\n' +
      '# Slide 2\n' +
      '* A\n' +
      '* B\n') : null)
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <title>
        Slide 1
      </title>
      <paragraph>Paragraph</paragraph>
      <code>Code</code>
    </slide>
    <slide>
      <title>
        Slide 2
      </title>
      <bulletedList>
        <li><paragraph>A</paragraph></li>
        <li><paragraph>B<cursor/></paragraph></li>
      </bulletedList>
    </slide>
  </editor>
);

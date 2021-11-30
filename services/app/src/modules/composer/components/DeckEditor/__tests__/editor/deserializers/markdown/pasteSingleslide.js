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
      '# Heading\n' +
      'Paragraph\n' +
      '```\nCode\n```') : null)
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <title>
        Heading
      </title>
      <paragraph>Paragraph</paragraph>
      <code>Code<cursor/></code>
    </slide>
  </editor>
);

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
      '# A quote\n' +
      '> To be, or not to be? That is the question.') : null)
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <title>A quote</title>
      <quote>
        To be, or not to be? That is the question.<cursor />
      </quote>
    </slide>
  </editor>
);

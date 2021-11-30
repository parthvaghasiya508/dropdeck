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
    getData: (mimeType) => (mimeType === 'text/html' ?
      '<html>' +
      '<!-- This is a comment -->\n' +
      '<p>This is a paragraph.</p>\n' +
      '<!-- Remember to add more information here -->' +
      '</html>' : undefined),
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <paragraph>This is a paragraph.</paragraph>
    </slide>
  </editor>
);

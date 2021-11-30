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
      '<h1>Title</h1>' +
      '<ul>' +
      '<li><p>First list item</p></li>' +
      '<li><p>Second list item</p></li>' +
      '</ul>' +
      '</html>' : undefined),
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <title>
        Title
      </title>
      <bulletedList>
        <li><paragraph>First list item</paragraph></li>
        <li><paragraph>Second list item<cursor/></paragraph></li>
      </bulletedList>
    </slide>
  </editor>
);

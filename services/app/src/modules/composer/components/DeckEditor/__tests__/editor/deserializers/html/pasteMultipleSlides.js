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
      '<h1>Slide 1</h1>' +
      '<ul>' +
      '<li><p>First list item</p></li>' +
      '<li><p>Second list item</p></li>' +
      '</ul>' +
      '<h1>Slide 2</h1>' +
      '<blockquote>' +
      'To be or not to be' +
      '</blockquote>' +
      '</html>' : undefined),
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <title>
        Slide 1
      </title>
      <bulletedList>
        <li><paragraph>First list item</paragraph></li>
        <li><paragraph>Second list item</paragraph></li>
      </bulletedList>
    </slide>
    <slide>
      <title>
        Slide 2
      </title>
      <quote>To be or not to be<cursor/></quote>
    </slide>
  </editor>
);

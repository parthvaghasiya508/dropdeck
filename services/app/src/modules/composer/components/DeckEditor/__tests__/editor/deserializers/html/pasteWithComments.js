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
      '<body><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}--></style></google-sheets-html-origin></body>' +
      '</html>' : undefined),
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide>
      <paragraph><text/></paragraph>
    </slide>
  </editor>
);

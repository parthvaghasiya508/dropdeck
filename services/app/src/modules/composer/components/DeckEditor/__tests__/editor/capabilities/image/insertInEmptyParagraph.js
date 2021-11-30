/** @jsx jsx */

import { jsx } from '../../../index';
import { FROM_UPLOAD } from "../../../../modules/plugins/component/media/image/transforms/insertImage";

export const input = (
  <editor>
    <slide>
      <paragraph>
        <cursor/>
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.insertImage('placeholder.png', 'My photo');
};

export const output = (
  <editor>
    <slide>
      <imageElement settings={{ url: "placeholder.png", name: "My photo", label: "My photo", from: FROM_UPLOAD }}><cursor/></imageElement>
    </slide>
  </editor>
);

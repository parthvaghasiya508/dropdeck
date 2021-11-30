/** @jsx jsx */

import { Editor } from 'slate';
import { jsx } from '../../../index';
import HeadingOneComponentPlugin from "../../../../modules/plugins/component/heading/one/HeadingOneComponentPlugin";

export const input = (
  <editor>
    <slide>
      <paragraph>
        The quick brown fox jumps over the lazy dog
      </paragraph>
      <paragraph>
        <cursor/>
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.insertComponent(new HeadingOneComponentPlugin());
  Editor.insertText(editor, "Click here to see what happened next!");
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        The quick brown fox jumps over the lazy dog
      </paragraph>
      <title>
        Click here to see what happened next!
        <cursor />
      </title>
    </slide>
  </editor>
);

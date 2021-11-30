/** @jsx jsx */

import { jsx } from '../../../../index';
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";

export const input = (
  <editor>
    <slide id="a">
      <paragraph>
        Slide 1
      </paragraph>
    </slide>
    <slide id="b">
      <paragraph>
        Slide 2
      </paragraph>
    </slide>
    <slide id="c" settings={{ foo: 'bar' }}>
      <paragraph>
        Slide 3
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  SlideTransforms.duplicateSlide(editor, "c");
};

export const output = (
  <editor>
    <slide id="a">
      <paragraph>
        Slide 1
      </paragraph>
    </slide>
    <slide id="b">
      <paragraph>
        Slide 2
      </paragraph>
    </slide>
    <slide id="c" settings={{ foo: 'bar' }}>
      <paragraph>
        Slide 3
      </paragraph>
    </slide>
    <slide id="c" settings={{ foo: 'bar' }}>
      <paragraph>
        <anchor/>Slide 3<focus/>
      </paragraph>
    </slide>
  </editor>
);

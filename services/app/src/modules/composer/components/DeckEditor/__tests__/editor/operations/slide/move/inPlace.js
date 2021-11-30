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
    <slide id="c">
      <paragraph>
        Slide 3
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  SlideTransforms.moveSlide(editor, "c", 2);
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
    <slide id="c">
      <paragraph>
        Slide 3
      </paragraph>
    </slide>
  </editor>
);

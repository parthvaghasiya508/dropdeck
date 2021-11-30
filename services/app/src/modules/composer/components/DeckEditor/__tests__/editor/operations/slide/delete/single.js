/** @jsx jsx */

import { jsx } from '../../../../index';
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";

export const input = (
  <editor>
    <slide id="a" settings={{ foo: 'bar' }}>
      <paragraph>
        Slide 1<cursor />
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  SlideTransforms.deleteSlide(editor, "a");
};

export const output = (
  <editor>
    <slide settings={{}}>
      <title><text/></title>
    </slide>
  </editor>
);

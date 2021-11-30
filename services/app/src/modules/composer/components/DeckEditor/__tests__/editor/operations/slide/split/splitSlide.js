/** @jsx jsx */

import { jsx } from '../../../../index';

export const input = (
  <editor>
    <slide>
      <paragraph>
        I will stay on the first slide...
      </paragraph>
      <paragraph>
        <cursor/>
      </paragraph>
      <paragraph>
        and I will be moved to the second slide.
      </paragraph>
    </slide>
  </editor>
);

export const run = (editor) => {
  editor.splitSlide();
};

export const output = (
  <editor>
    <slide>
      <paragraph>
        I will stay on the first slide...
      </paragraph>
      <paragraph><text /></paragraph>
    </slide>
    <slide>
      <paragraph>
        <cursor />
      </paragraph>
      <paragraph>
        and I will be moved to the second slide.
      </paragraph>
    </slide>
  </editor>
);

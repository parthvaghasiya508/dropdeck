/** @jsx jsx */

import { jsx } from '../../../index';
import { DEFAULT_SCALING } from "../../../../../../../presenter/components/Slide/scalingLimits";

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
    getData: (mimeType) => (mimeType === 'application/x-slate-fragment' ?
      'JTVCJTdCJTIydHlwZSUyMiUzQSUyMnNsaWRlJTIyJTJDJTIyaWQlMjIlM0ElMjI0NjNmY2ExLTBhOGUtZDNhNy0yNjc0LWJmYjcyMzBkYzIzNCUyMiUyQyUyMnNldHRpbmdzJTIyJTNBJTdCJTIyc2NhbGluZyUyMiUzQTMuNSU3RCUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTdCJTIydHlwZSUyMiUzQSUyMmhlYWRpbmctb25lJTIyJTJDJTIyY2hpbGRyZW4lMjIlM0ElNUIlN0IlMjJ0ZXh0JTIyJTNBJTIyRmlyc3QlMjBzbGlkZSUyMiU3RCU1RCU3RCU1RCU3RCUyQyU3QiUyMnR5cGUlMjIlM0ElMjJzbGlkZS1icmVhayUyMiUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTdCJTIydGV4dCUyMiUzQSUyMiUyMiU3RCU1RCU3RCUyQyU3QiUyMnR5cGUlMjIlM0ElMjJzbGlkZSUyMiUyQyUyMmlkJTIyJTNBJTIyMDdhZDA1Mi1mMjY3LTgxYjItY2RlMy04MDVhYWU1ZDgyNyUyMiUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTdCJTIydHlwZSUyMiUzQSUyMmhlYWRpbmctb25lJTIyJTJDJTIyY2hpbGRyZW4lMjIlM0ElNUIlN0IlMjJ0ZXh0JTIyJTNBJTIyU2Vjb25kJTIwc2xpZGUlMjIlN0QlNUQlN0QlMkMlN0IlMjJ0eXBlJTIyJTNBJTIyYnVsbGV0ZWQtbGlzdCUyMiUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTdCJTIydHlwZSUyMiUzQSUyMmxpc3QtaXRlbSUyMiUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTdCJTIydHlwZSUyMiUzQSUyMnBhcmFncmFwaCUyMiUyQyUyMmNoaWxkcmVuJTIyJTNBJTVCJTdCJTIydGV4dCUyMiUzQSUyMkElMjIlN0QlNUQlN0QlNUQlN0QlMkMlN0IlMjJ0eXBlJTIyJTNBJTIybGlzdC1pdGVtJTIyJTJDJTIyY2hpbGRyZW4lMjIlM0ElNUIlN0IlMjJ0eXBlJTIyJTNBJTIycGFyYWdyYXBoJTIyJTJDJTIyY2hpbGRyZW4lMjIlM0ElNUIlN0IlMjJ0ZXh0JTIyJTNBJTIyQiUyMiU3RCU1RCU3RCU1RCU3RCU1RCU3RCUyQyU3QiUyMnR5cGUlMjIlM0ElMjJwYXJhZ3JhcGglMjIlMkMlMjJjaGlsZHJlbiUyMiUzQSU1QiU3QiUyMnRleHQlMjIlM0ElMjIlMjIlN0QlNUQlN0QlNUQlMkMlMjJzZXR0aW5ncyUyMiUzQSU3QiUyMnNjYWxpbmclMjIlM0EzLjUlN0QlN0QlNUQ=' :
      null
    ),
  };
  editor.insertData(data);
};

export const output = (
  <editor>
    <slide settings={{ scaling: DEFAULT_SCALING }}>
      <title>
        First slide
      </title>
    </slide>
    <slide settings={{ scaling: DEFAULT_SCALING }}>
      <title>
        Second slide
      </title>
      <bulletedList>
        <li><paragraph>A</paragraph></li>
        <li><paragraph>B</paragraph></li>
      </bulletedList>
      <paragraph><cursor/></paragraph>
    </slide>
  </editor>
);

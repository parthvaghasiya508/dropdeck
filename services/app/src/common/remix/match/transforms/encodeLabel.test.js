import { decodeLabel, encodeLabel } from "./encodeLabel";

it('should encode match labels to camel case', () => {
  expect(encodeLabel('group-text')).toEqual('groupText');
  expect(decodeLabel('groupText')).toEqual('group-text');
});

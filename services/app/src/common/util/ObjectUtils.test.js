import ObjectUtils from "./ObjectUtils";

it('correctly identifies different objects', () => {
  const a = { foo: { bar: true } };
  const b = { foo: { bar: false } };
  expect(ObjectUtils.shallowEquals(a, b)).toBeFalsy();
});

it('correctly identifies equal objects', () => {
  const a = { foo: { bar: true } };
  const b = { foo: { bar: true } };
  expect(ObjectUtils.shallowEquals(a, b)).toBeTruthy();
});

it('incorrectly identifies equal objects', () => {
  const a = { state: 'active', foo: { bar: true } };
  const b = { foo: { bar: true }, state: 'active' };
  expect(ObjectUtils.shallowEquals(a, b)).toBeFalsy();
});

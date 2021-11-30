import { Sets } from "./Sets";

it('computes the union of two sets', () => {
  const a = new Set([1, 2, 3]);
  const b = new Set([3, 4, 5]);
  expect(Sets.union(a, b)).toStrictEqual(new Set([1, 2, 3, 4, 5]));
});

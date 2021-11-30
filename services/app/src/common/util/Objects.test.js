import { Objects } from "./Objects";

it('computes the union of two objects', () => {
  const a = {
    1: 'x',
    2: {
      3: 'y',
    },
  };
  const b = {
    2: {
      5: 'w',
    },
    4: 'z'
  };

  const expected = {
    1: 'x',
    2: {
      3: 'y',
      5: 'w',
    },
    4: 'z'
  };

  expect(Objects.union(a, b)).toEqual(expected);

});

import { overlap } from "./overlap";

it('computes set overlaps', () => {
  const sets = [
    { sets: ['A'], size: 1 },
    { sets: ['B'], size: 2 },
  ];
  expect(overlap(sets)).toEqual([{ sets: ['A','B'], size: 0.5 }]);
});

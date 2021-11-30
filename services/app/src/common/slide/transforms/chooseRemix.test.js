import { chooseRemix } from "./chooseRemix";

it('chooses a remix for a slide', () => {

  const matchingRemixes = [
    { name: 'r1' },
    { name: 'r2' },
    { name: 'r3' },
  ];

  expect(chooseRemix({
    remix: 'r2',
    matchingRemixes,
  })).toEqual('r2');

  expect(chooseRemix({
    remix: 'r0',
    matchingRemixes,
  })).toEqual('r1');

  expect(chooseRemix({
    remix: 'r0',
    matchingRemixes: [],
  })).toBeNull();
});

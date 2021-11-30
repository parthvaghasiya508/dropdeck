import { SomeElementMatcher } from "./SomeElementMatcher";

it('should create a wildcard expression', () => {
  expect(new SomeElementMatcher().expression).toEqual(/[^\{\}]+/);
});

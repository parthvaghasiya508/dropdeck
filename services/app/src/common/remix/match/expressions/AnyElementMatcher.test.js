import { AnyElementMatcher } from "./AnyElementMatcher";

it('should create a wildcard expression', () => {
  expect(new AnyElementMatcher().expression).toEqual(/[^\{\}]*/);
});

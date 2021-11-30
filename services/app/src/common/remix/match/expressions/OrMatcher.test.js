import { optional } from "./Occurring";
import { OrMatcher } from "./OrMatcher";
import { headingOne, paragraph } from "../Matchers";

it('should create a Boolean OR expression', () => {
  expect(new OrMatcher(headingOne(), paragraph(optional)).expression).toEqual(
    /(?:(?:(?:\[h1#[0-9]+\]))|(?:(?:\[p#[0-9]+\])?))/
  );
});

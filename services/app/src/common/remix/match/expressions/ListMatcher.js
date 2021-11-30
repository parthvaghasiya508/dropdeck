import { Matcher } from "./Matcher";

export class ListMatcher extends Matcher {
  constructor(...matchers) {
    super(matchers.map((matcher) => matcher.pattern).join(''), matchers.map((matcher) => matcher.captureGroups).reduce((a, b) => a.concat(b)));
  }
}

import { Matcher } from "./Matcher";

const disjunctionPattern = (matchers, boundary = false) => (
  `(?:${matchers.map((matcher) => (!boundary ? `(?:${matcher.pattern})` : `(?:^${matcher.pattern}$)`)).join('|')})`
);

export class OrMatcher extends Matcher {
  constructor(...matchers) {
    super(disjunctionPattern(matchers), matchers.map((matcher) => matcher.captureGroups).reduce((a, b) => a.concat(b)));
    this.matchers = matchers;
  }

  updateWithBoundaryCondition = () => {
    this.pattern = disjunctionPattern(this.matchers, true);
  }

}

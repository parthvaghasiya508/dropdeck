import { Matcher } from "./Matcher";
import { OrMatcher } from "./OrMatcher";

const exactMatchPattern = (matcher) => {
  if (matcher instanceof OrMatcher) {
    matcher.updateWithBoundaryCondition();
  }
  return `^${matcher.pattern}$`;
};

export class ExactInputMatcher extends Matcher {
  constructor(matcher) {
    super(exactMatchPattern(matcher), matcher.captureGroups);
  }
}

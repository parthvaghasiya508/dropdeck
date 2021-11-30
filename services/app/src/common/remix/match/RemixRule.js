/**
 * A remix rule has two components: a matcher, which evaluates a data structure against the rule, and a scoring function,
 * which assigns a positive score to a data structure that matches the rule.
 */
import { ExactInputMatcher } from "./expressions/ExactInputMatcher";
import { ListMatcher } from "./expressions/ListMatcher";

export class RemixRule {
  constructor(...matchers) {
    this.matcher = Array.isArray(matchers) ? (
      matchers.length === 1 ? new ExactInputMatcher(matchers[0]) : new ExactInputMatcher(new ListMatcher(...matchers))
    ) : new ExactInputMatcher(matchers);
    this.scoring = () => 1;
  }

  matches(slide) {
    return this.evaluate(slide)[0] > 0;
  }

  evaluate(slide) {
    const labels = this.matcher.evaluate(slide);
    if (labels) {
      return [this.scoring(slide), labels];
    }
    return [0,];
  }

  score(val) {
    this.scoring = (typeof val === 'function') ? val : () => val;
    return this;
  }
}

// Fluent syntax shorthand for building a remix rule:
export const when = (...matchers) => new RemixRule(...matchers);

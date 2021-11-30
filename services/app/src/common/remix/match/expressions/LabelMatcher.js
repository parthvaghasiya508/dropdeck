import { Matcher } from "./Matcher";
import { encodeLabel } from "../transforms/encodeLabel";

export class LabelMatcher extends Matcher {
  constructor(matcher, name) {
    super(`(${matcher.pattern})`, [encodeLabel(name), ...matcher.captureGroups]);
  }
}

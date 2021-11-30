import { Matcher } from "./Matcher";
import { Occurring } from "./Occurring";

export class GroupMatcher extends Matcher {
  constructor(matcher, occurrence) {
    super(occurrence !== Occurring.once ? `(?:${matcher.pattern})${occurrence}` : matcher.pattern, matcher.captureGroups);
  }
}

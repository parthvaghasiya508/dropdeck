import { Occurring } from "./Occurring";
import { Matcher } from "./Matcher";

export const clusterExpression = (matcher) => `(?:\\{${matcher.pattern}#[0-9]+\\})`;

export class ClusterMatcher extends Matcher {
  constructor(matcher, occurrence = Occurring.once) {
    super(occurrence !== Occurring.once ? `${clusterExpression(matcher)}${occurrence}` : clusterExpression(matcher), matcher.captureGroups);
  }
}

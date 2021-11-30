import { allText, cluster, group, or } from "../../match/Matchers";
import { atLeast } from "../../match/expressions/Occurring";

export const matchTextOrClusterWideImg = group(
  or(
    cluster(allText(atLeast(1))),
    allText(),
  ), atLeast(1)
);

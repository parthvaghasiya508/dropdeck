import { allTextTable, cluster, group, or } from "../../match/Matchers";
import { atLeast } from "../../match/expressions/Occurring";

export const matchTextOrCluster = group(
  or(
    cluster(allTextTable(atLeast(1))),
    allTextTable(),
  ), atLeast(1)
);

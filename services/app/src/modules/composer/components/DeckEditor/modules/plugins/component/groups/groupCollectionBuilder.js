import { GROUP_COLLECTION } from "./type";
import { groupBuilder } from "./components/group/groupBuilder";

export const groupCollectionBuilder = (...groups) => {
  if (!groups || groups.length === 0) {
    groups = [groupBuilder()];
  }
  return {
    type: GROUP_COLLECTION,
    children: groups,
  };
};

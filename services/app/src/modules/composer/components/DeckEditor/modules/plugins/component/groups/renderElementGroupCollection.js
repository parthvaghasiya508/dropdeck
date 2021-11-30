import { getRenderElement } from "@udecode/slate-plugins";
import { GROUP_COLLECTION } from "./type";
import { GroupCollectionEditorElement } from "./components/GroupCollectionEditorElement";

export const renderElementGroupCollection = getRenderElement({
  type: GROUP_COLLECTION,
  component: GroupCollectionEditorElement,
});

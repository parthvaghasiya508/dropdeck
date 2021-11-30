import { getRenderElement } from "@udecode/slate-plugins";
import { GROUP } from "./type";
import { GroupEditorElement } from "./components/GroupEditorElement";

export const renderElementGroup = getRenderElement({
  type: GROUP,
  component: GroupEditorElement,
});

import { getRenderElement } from "@udecode/slate-plugins";
import { BulletedListEditorElement } from "./components/BulletedListEditorElement";
import { BULLETED_LIST } from "./type";

export const renderElementBulletedList = getRenderElement({
  type: BULLETED_LIST,
  component: BulletedListEditorElement,
});

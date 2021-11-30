import { getElementComponent, getRenderElement } from "@udecode/slate-plugins";
import { LIST_ITEM } from "./type";

export const renderElementListItem = getRenderElement({
  type: LIST_ITEM,
  component: getElementComponent('li'),
});

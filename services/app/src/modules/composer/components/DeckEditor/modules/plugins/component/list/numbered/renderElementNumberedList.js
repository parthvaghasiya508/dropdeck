import { getRenderElement } from "@udecode/slate-plugins";
import { NumberedListEditorElement } from "./components/NumberedListEditorElement";
import { NUMBERED_LIST } from "./type";

export const renderElementNumberedList = getRenderElement({
  type: NUMBERED_LIST,
  component: NumberedListEditorElement,
});

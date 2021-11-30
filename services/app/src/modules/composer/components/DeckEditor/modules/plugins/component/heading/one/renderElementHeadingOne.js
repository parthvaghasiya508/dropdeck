import { getRenderElement } from "@udecode/slate-plugins";
import { HeadingOneEditorElement } from "./components/HeadingOneEditorElement";
import { HEADING_ONE } from "./type";

export const renderElementHeadingOne = getRenderElement({
  type: HEADING_ONE,
  component: HeadingOneEditorElement,
});

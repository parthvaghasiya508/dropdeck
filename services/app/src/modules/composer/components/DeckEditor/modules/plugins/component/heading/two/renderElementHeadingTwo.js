import { getRenderElement } from "@udecode/slate-plugins";
import { HeadingTwoEditorElement } from "./components/HeadingTwoEditorElement";
import { HEADING_TWO } from "./type";

export const renderElementHeadingTwo = getRenderElement({
  type: HEADING_TWO,
  component: HeadingTwoEditorElement,
});

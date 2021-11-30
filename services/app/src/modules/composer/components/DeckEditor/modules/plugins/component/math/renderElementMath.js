import { getRenderElement } from "@udecode/slate-plugins";
import { MathEditorElement } from "./components/MathEditorElement";
import { MATH } from "./type";

export const renderElementMath = getRenderElement({
  type: MATH,
  component: MathEditorElement,
});

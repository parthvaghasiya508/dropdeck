import { getRenderElement } from "@udecode/slate-plugins";
import { CodeEditorElement } from "./components/CodeEditorElement";
import { CODE } from "./type";

export const renderElementCode = getRenderElement({
  type: CODE,
  component: CodeEditorElement,
});

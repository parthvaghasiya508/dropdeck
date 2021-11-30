import { getRenderElement } from "@udecode/slate-plugins";
import { LINK } from "./type";
import { LinkEditorElement } from "./components/LinkEditorElement";

export const renderElementLink = getRenderElement({
  type: LINK,
  component: LinkEditorElement,
});

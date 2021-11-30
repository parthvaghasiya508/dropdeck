import { getRenderElement } from "@udecode/slate-plugins";
import { ImageEditorElement } from "./components/ImageEditorElement";
import { IMAGE } from "./type";

export const renderElementImage = getRenderElement({
  type: IMAGE,
  component: ImageEditorElement,
});

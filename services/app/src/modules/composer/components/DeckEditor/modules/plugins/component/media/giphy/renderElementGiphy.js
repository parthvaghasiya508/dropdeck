import { getRenderElement } from "@udecode/slate-plugins";
import { GiphyEditorElement } from "./components/GiphyEditorElement";
import { GIPHY } from "./type";

export const renderElementGiphy = getRenderElement({
  type: GIPHY,
  component: GiphyEditorElement,
});

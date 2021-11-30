import { getRenderElement } from "@udecode/slate-plugins";
import { SlideElement } from "./components";
import { SLIDE } from "./type";

export const renderElementSlide = getRenderElement({
  type: SLIDE,
  component: SlideElement,
});

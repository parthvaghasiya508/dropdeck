import { getRenderElement } from "@udecode/slate-plugins";
import { VideoElement } from "./components/VideoElement";
import { VIDEO } from "./type";

export const renderElementVideo = getRenderElement({
  type: VIDEO,
  component: VideoElement,
});

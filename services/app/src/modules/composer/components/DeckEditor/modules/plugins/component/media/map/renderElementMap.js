import { getRenderElement } from "@udecode/slate-plugins";
import { MapElement } from "./components/MapElement";
import { MAP } from "./type";

export const renderElementMap = getRenderElement({
  type: MAP,
  component: MapElement,
});

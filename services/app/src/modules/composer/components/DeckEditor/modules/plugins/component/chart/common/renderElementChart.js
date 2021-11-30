import { getRenderElement } from "@udecode/slate-plugins";
import { ChartElement } from "./components/ChartElement";

export const renderElementChart = (type) => getRenderElement({
  type,
  component: ChartElement,
});

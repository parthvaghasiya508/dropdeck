import { getRenderElement } from "@udecode/slate-plugins";
import { VennDiagramElement } from "./components/VennDiagramElement";

export const renderElementVennDiagram = getRenderElement({
  type: 'venn',
  component: VennDiagramElement,
});

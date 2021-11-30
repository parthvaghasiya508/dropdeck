import React from "react";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

import ComponentPlugin from "../../../../../../../../common/api/plugins/ComponentPlugin";
import { VennDiagramSlideComponent } from "./components/VennDiagramSlideComponent";
import { renderElementVennDiagram } from "./renderElementVennDiagram";
import { renderElementWithGutter } from "../../../gutter/renderElementWithGutter";
import { vennDiagramConfigurator } from "./configuration/vennDiagramConfigurator";
import { VENN_DIAGRAM } from "./type";

const ICON = <BubbleChartIcon />;

export const VennDiagramPlugin = () => ({
  editorComponent: renderElementWithGutter(renderElementVennDiagram, ICON),
  keywords: 'venn,diagram,bubbles',
  name: 'venn',
  type: VENN_DIAGRAM,
  slideComponent: VennDiagramSlideComponent,
  configuration: vennDiagramConfigurator,
  icon: ICON,
  categories: [ComponentPlugin.Category.LIST],
});

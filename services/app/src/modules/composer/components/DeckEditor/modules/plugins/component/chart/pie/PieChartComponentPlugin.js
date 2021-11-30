import React from "react";
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';
import { renderElementChart } from "../common/renderElementChart";
import { PieChartSlideComponent } from "./components/PieChartSlideComponent";
import { chartConfigurator } from "../common/configuration/chartConfigurator";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { CHART_PIE } from "./type";
import { listBuilder } from "../../list/listBuilder";

const ICON = <PieChartRoundedIcon />;

export default class PieChartComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: CHART_PIE,
      icon: ICON,
      editorComponent: renderElementChart(CHART_PIE),
      slideComponent: PieChartSlideComponent,
      metadata: {
        keywords: 'pie chart,chart,graph',
        name: 'pie chart',
        description: 'Show proportions between categories.',
        categories: [ComponentPlugin.Category.CHART, ComponentPlugin.Category.LIST],
      },
      configuration: chartConfigurator(CHART_PIE),
      builder: listBuilder(CHART_PIE),
    });
  }
}

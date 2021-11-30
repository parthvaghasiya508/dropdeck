import React from "react";
import BarChartRoundedIcon from '@material-ui/icons/BarChart';
import { ColumnChartSlideComponent } from "./components/ColumnChartSlideComponent";
import { renderElementChart } from "../../common/renderElementChart";
import { chartConfigurator } from "../../common/configuration/chartConfigurator";
import ComponentPlugin from "../../../../../../../../../../common/api/plugins/ComponentPlugin";
import { CHART_COLUMN } from "./type";
import { listBuilder } from "../../../list/listBuilder";

const ICON = <BarChartRoundedIcon />;

export default class ColumnChartComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: CHART_COLUMN,
      icon: ICON,
      editorComponent: renderElementChart(CHART_COLUMN),
      slideComponent: ColumnChartSlideComponent,
      metadata: {
        keywords: 'column chart,chart,graph',
        name: 'column chart',
        description: 'Display numerical values as vertical columns.',
        categories: [ComponentPlugin.Category.CHART, ComponentPlugin.Category.LIST],
      },
      configuration: chartConfigurator(CHART_COLUMN),
    });
  }
}

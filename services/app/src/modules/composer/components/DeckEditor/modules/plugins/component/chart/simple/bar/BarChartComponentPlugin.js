import React from "react";
import BarChartRoundedIcon from '@material-ui/icons/BarChart';
import { BarChartSlideComponent } from "./components/BarChartSlideComponent";
import { renderElementChart } from "../../common/renderElementChart";
import { barChartConfigurator } from "./barChartConfigurator";
import ComponentPlugin from "../../../../../../../../../../common/api/plugins/ComponentPlugin";
import { CHART_BAR } from "./type";
import { listBuilder } from "../../../list/listBuilder";

const ICON = <BarChartRoundedIcon style={{ WebkitTransform: "rotate(90deg)", MozTransform: "rotate(90deg)", OTransform: "rotate(90deg)", msTransform: "rotate(90deg)", transform: "rotate(90deg)" }}/>;

export default class BarChartComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: CHART_BAR,
      icon: ICON,
      editorComponent: renderElementChart(CHART_BAR),
      slideComponent: BarChartSlideComponent,
      metadata: {
        keywords: 'bar chart,chart,graph',
        name: 'bar chart',
        description: 'Display numerical values as horizontal bars.',
        categories: [ComponentPlugin.Category.CHART, ComponentPlugin.Category.LIST],
      },
      configuration: barChartConfigurator,
      builder: listBuilder(CHART_BAR),
    });
  }
}

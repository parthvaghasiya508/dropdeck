import React from "react";
import BubbleChartRoundedIcon from '@material-ui/icons/BubbleChartRounded';
import { renderElementChart } from "../common/renderElementChart";
import { SunburstChartSlideComponent } from "./components/SunburstChartSlideComponent";
import { sunburstChartConfigurator } from "./sunburstChartConfigurator";
import ComponentPlugin from "../../../../../../../../../common/api/plugins/ComponentPlugin";
import { CHART_SUNBURST } from "./type";

const ICON = <BubbleChartRoundedIcon />;

export default class SunburstChartComponentPlugin extends ComponentPlugin {

  constructor() {
    super({
      type: CHART_SUNBURST,
      icon: ICON,
      editorComponent: renderElementChart(CHART_SUNBURST),
      slideComponent: SunburstChartSlideComponent,
      metadata: {
        keywords: 'sunburst chart,chart,graph',
        name: 'sunburst chart',
        description: 'Visualise proportions between hierarchical categories.',
        categories: [ComponentPlugin.Category.CHART, ComponentPlugin.Category.LIST, ComponentPlugin.Category.NESTED],
      },
      configuration: sunburstChartConfigurator,
    });
  }
}

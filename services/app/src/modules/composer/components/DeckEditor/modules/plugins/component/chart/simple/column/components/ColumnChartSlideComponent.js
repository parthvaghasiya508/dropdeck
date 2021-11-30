import React from "react";
import { BarChartSlideComponent } from "../../bar/components/BarChartSlideComponent";
import { Layout } from "../../bar/components/nivo/BarChartComponent";

export class ColumnChartSlideComponent extends BarChartSlideComponent {
  constructor({ node, view, themeName, slideSettings, monitor }) {
    super({ node, view, themeName, slideSettings, monitor, layout: Layout.VERTICAL });
  }
}

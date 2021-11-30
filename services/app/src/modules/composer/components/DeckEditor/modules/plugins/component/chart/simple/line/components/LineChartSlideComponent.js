import React from "react";
import { SimpleChartSlideComponent } from "../../SimpleChartSlideComponent";
import LineChartComponent from "./nivo/LineChartComponent";
import { listToSeries } from "../../../common/queries/listToSeries";
import { trimLabels } from "../../../utils/trimLabels";
import { CHART_LINE } from "../type";

export class LineChartSlideComponent extends SimpleChartSlideComponent {
  constructor({ node, view, themeName, slideSettings, monitor }) {
    super({ node, view, themeName, slideSettings, monitor });
    const data = [{
      id: 'default',
      data: trimLabels(listToSeries(node, CHART_LINE)).map((d) => ({ x: d.id, y: d.value, suffix: d.suffix, prefix: d.prefix })),
    }];
    const colors = [this.palette.accentColor];
    this.setComponent(
      <LineChartComponent
        data={data}
        theme={this.chartTheme}
        colors={colors}
      />
    );
  }
}

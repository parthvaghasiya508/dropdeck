import React from "react";
import BarChartComponent, { Layout } from "./nivo/BarChartComponent";
import { SimpleChartSlideComponent } from "../../SimpleChartSlideComponent";
import { listToSeries } from "../../../common/queries/listToSeries";
import { trimLabels } from "../../../utils/trimLabels";
import { CHART_BAR } from "../type";

export class BarChartSlideComponent extends SimpleChartSlideComponent {
  constructor({ node, view, themeName, slideSettings, monitor, layout = Layout.HORIZONTAL }) {
    super({ node, view, themeName, slideSettings, monitor });
    const data = [];
    const suffixes = {};
    trimLabels(listToSeries(node, CHART_BAR)).forEach((d) => {
      data.push({ id: d.id, [d.id]: d.value, suffix: d.suffix, prefix: d.prefix });
    });
    const categories = data.map((d) => d.id);
    const colors = [this.palette.accentColor];
    this.setComponent(
      <BarChartComponent
        data={data}
        layout={layout}
        suffixes={suffixes}
        categories={categories}
        colors={colors}
        theme={this.chartTheme}
      />
    );
  }
}

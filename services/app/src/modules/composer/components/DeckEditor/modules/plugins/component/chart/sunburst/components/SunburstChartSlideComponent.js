import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { listToSeries } from "../../common/queries/listToSeries";
import { getPaletteForSlide } from "../../../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import SunburstChartComponent from "./nivo/SunburstChartComponent";
import { CHART_SUNBURST } from "../type";
import { CHART } from "../../type";

export class SunburstChartSlideComponent extends SlideComponent {
  constructor({ node, themeName, slideSettings }) {
    super();
    this.setMarkupType(CHART);
    const palette = getPaletteForSlide(themeName, slideSettings);
    const data = {
      id: 'root',
      children: listToSeries(node, CHART_SUNBURST),
    };
    const colors = palette ? palette.scale(data.length) : [];
    const chartTheme = {
      fontSize: '0.8em',
      textColor: palette.textColor,
      borderColor: palette.backgroundColor,
      labels: {
        text: {
          fill: palette.backgroundColor,
        }
      },
      tooltip: {
        container: {
          fontSize: '0.8em',
          background: palette.backgroundColor
        },
      }
    };
    this.setComponent(
      <SunburstChartComponent
        data={data}
        colors={colors}
        theme={chartTheme}
        backgroundColor={palette.backgroundColor}
      />
    );
  }
}

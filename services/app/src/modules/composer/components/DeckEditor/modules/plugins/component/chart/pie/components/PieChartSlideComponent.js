import React from "react";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { listToSeries } from "../../common/queries/listToSeries";
import { getPaletteForSlide } from "../../../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import PieChartComponent from "./nivo/PieChartComponent";
import { trimLabels } from "../../utils/trimLabels";
import { CHART_PIE } from "../type";
import { CHART } from "../../type";

export class PieChartSlideComponent extends SlideComponent {
  constructor({ node, themeName, slideSettings }) {
    super();
    this.setMarkupType(CHART);
    const palette = getPaletteForSlide(themeName, slideSettings);
    const data = trimLabels(listToSeries(node, CHART_PIE));
    const colors = palette ? palette.scale(data.length) : [];
    const chartTheme = {
      fontSize: '0.8em',
      textColor: palette.textColor,
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
      <PieChartComponent
        data={data}
        colors={colors}
        theme={chartTheme}
        backgroundColor={palette.backgroundColor}
      />
    );
  }
}

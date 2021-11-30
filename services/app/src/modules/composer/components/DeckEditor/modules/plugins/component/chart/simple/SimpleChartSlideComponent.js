import React from "react";
import SlideComponent from "../../../../../../../../../common/slide/SlideComponent";
import { getPaletteForSlide } from "../../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { CHART } from "../type";

export class SimpleChartSlideComponent extends SlideComponent {
  constructor({ themeName, slideSettings }) {
    super();
    this.setMarkupType(CHART);
    this.palette = getPaletteForSlide(themeName, slideSettings);
    this.chartTheme = {
      fontSize: '0.8em',
      textColor: this.palette.textColor,
      borderColor: this.palette.backgroundColor,
      labels: {
        text: {
          fill: this.palette.backgroundColor,
        }
      }
    };
  }
}

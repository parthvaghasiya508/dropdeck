import React from "react";
import * as culori from "culori";
import SlideComponent from "../../../../../../../../../../common/slide/SlideComponent";
import { getMapUrl } from "../transforms/mapTransforms";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
import { getPaletteForSlide } from "../../../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { IMAGE } from "../../image/type";

const encode = (color) => {
  if (color !== undefined) {
    color = color.replace(/^#([0-9a-fA-F]{3})$/, "#$1$1");
    color = color.replace(/#/, '0x');
  }
  return color;
};

const MAX_DIMENSION = 640; // Google maps limit
const resizeMap = (url) => (width, height) => `${url}&size=${Math.min(width.toFixed(), MAX_DIMENSION)}x${Math.min(height.toFixed(), MAX_DIMENSION)}`;

export class MapSlideComponent extends SlideComponent {
  constructor({ node, themeName, slideSettings, monitor }) {
    super();
    this.setMarkupType(IMAGE);
    const { location } = node.settings ? node.settings : { undefined };
    const palette = getPaletteForSlide(themeName, slideSettings) || {};
    const accentColor = encode(palette.accentColor);
    const backgroundColor = encode(culori.formatHex(culori.average([culori.formatRgb({ ...culori.parse(palette.backgroundColor), alpha: 1 }), "#fff"])));
    const titleColor = encode(palette.titleColor);
    const textColor = encode(palette.textColor);

    // Interpret relative URLs relative to the API service.
    if (location !== undefined) {
      const url = getMapUrl({
        location,
        width: 400,
        height: 230,
        zoomLevel: 9,
        accentColor,
        backgroundColor,
        titleColor,
        primaryTextFillColor: textColor,
        secondaryTextFillColor: textColor
      });
      const altLabel = `Map of ${location}`;
      this.setComponent(<ImageComponent url={resizeMap(url)} label={altLabel} monitor={monitor}/>);
    }
  }
}

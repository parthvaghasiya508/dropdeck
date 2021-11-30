import { Editor, Transforms } from "slate";
import { capitalise } from "../../../../../../../../../../common/transforms/capitalise";
import { logoBuilder } from "../logoBuilder";

export const logoToUse = (data) => {
  const { image: logoImage, whiteOnTransparent: logoWhiteOnTransparent, height: logoHeight, width: logoWidth, svg: logoSvg, bgColor: logoBgColor } = data?.logo || {};
  const { image: iconImage, whiteOnTransparent: iconWhiteOnTransparent, height: iconHeight, width: iconWidth, svg: iconSvg, bgColor: iconBgColor } = data?.icon || {};

  let url;
  let whiteOnTransparent;
  let bgColor;
  let height;
  let width;

  if (logoSvg) {
    url = logoSvg;
    // Assuming SVG and logo have same characteristics
    whiteOnTransparent = logoWhiteOnTransparent;
    bgColor = logoBgColor;
    height = logoHeight;
    width = logoWidth;
  } else if (iconSvg) {
    url = iconSvg;
    whiteOnTransparent = iconWhiteOnTransparent;
    bgColor = iconBgColor;
    height = iconHeight;
    width = iconWidth;
  } else if (iconImage && logoImage && iconHeight * iconWidth > logoHeight * logoWidth) {
    url = iconImage;
    whiteOnTransparent = iconWhiteOnTransparent;
    bgColor = iconBgColor;
    height = iconHeight;
    width = iconWidth;
  } else if (logoImage) {
    url = logoImage;
    whiteOnTransparent = logoWhiteOnTransparent;
    bgColor = logoBgColor;
    height = logoHeight;
    width = logoWidth;
  } else {
    url = iconImage;
    whiteOnTransparent = iconWhiteOnTransparent;
    bgColor = iconBgColor;
    height = iconHeight;
    width = iconWidth;
  }

  return { url, whiteOnTransparent, bgColor, height, width };
};

export const logoConfigurationBuilder = (data) => (editor, node, path, resolve) => {
  if (data) {
    const { query, payload } = data;
    const logoNode = logoBuilder(payload.data, capitalise(query));
    Editor.withoutNormalizing(editor, () => {
      Transforms.setNodes(editor, logoNode, { at: path });
    });
    resolve();
  }
};

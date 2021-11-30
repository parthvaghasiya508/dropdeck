import React from "react";
import { Node, Text } from "slate";
import { parseDataPoint } from "./common/queries/parseDataPoint";
import "./ChartDataPlugin.scss";
import { GROUP } from "../groups/components/group/type";
import { SelectionTransforms } from "../../../../services/transforms/SelectionTransforms";

export const ChartDataPlugin = (chartTypes, materialTheme) => ({
  decorate: decorateDataPoints(chartTypes),
  renderLeaf: renderLeafDataPoints(materialTheme),
});

/**
 * Render data point decorations.
 */
const renderLeafDataPoints = (materialTheme) => ({ children, leaf, attributes }) => {
  if (leaf.isDataLabel && !!leaf.text) {
    return <span className="chart data label" style={{ backgroundColor: materialTheme.palette.label.light }}>{children}</span>;
  }
  if (leaf.isDataValue && !!leaf.text) {
    return <span className="chart data value" style={{ backgroundColor: materialTheme.palette.label.dark }}>{children}</span>;
  }
  return children;
};

/**
 * Parse all <label>: <value> pairs for chart elements in the editor, and markup.
 * @param chartTypes
 * @returns {function(...[*]=)}
 */
const decorateDataPoints = (chartTypes) => ([node, path]) => {
  if (SelectionTransforms.isSlideElementPath(path)) {
    return traverseComponentElement(chartTypes, node, path);
  }

  if (node.type === GROUP) {
    const ranges = [];
    node.children.forEach((childNode, index) => {
      const childPath = [...path, index];
      const childRanges = traverseComponentElement(chartTypes, childNode, childPath);
      if (childRanges && childRanges.length > 0) {
        ranges.push(...childRanges);
      }
    });
    return ranges;
  }
  return [];
};

const traverseComponentElement = (chartTypes, node, path) => {
  if (chartTypes.includes(node.type)) {
    const ranges = [];
    traverseDataPoints(node, path, ranges);
    return ranges;
  }
  return [];
};

const traverseDataPoints = (node, path, ranges) => {
  if (!node) {
    return;
  }
  if (Text.isText(node)) {
    const text = Node.string(node);
    if (text) {
      const {
        label,
        separator = '',
        value,
      } = parseDataPoint(text);

      // Create separate ranges for the label and value parts of the data expression.
      let start = 0;
      ranges.push({
        isDataLabel: true,
        anchor: { path, offset: start },
        focus: { path, offset: start + label.length },
      });
      start += (label.length + separator.length);
      ranges.push({
        isDataValue: true,
        anchor: { path, offset: start },
        focus: { path, offset: start + `${value}`.length },
      });
    }
  } else if (node.children) {
    node.children.forEach((child, i) => {
      const childPath = [...path, i];
      traverseDataPoints(child, childPath, ranges);
    });
  }
};

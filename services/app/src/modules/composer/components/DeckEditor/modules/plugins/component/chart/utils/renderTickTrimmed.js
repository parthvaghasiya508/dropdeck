import React from "react";
import { trimLabel } from "./trimLabels";

export const renderTickTrimmed = (theme) => (tick) => {
  const {
    opacity,
    textAnchor,
    textBaseline,
    textX,
    rotate,
    textY,
    value,
    x,
    y
  } = tick;
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ opacity }}
    >
      <text
        fontSize={theme ? theme.fontSize : '1em'}
        alignmentBaseline={textBaseline}
        textAnchor={textAnchor}
        transform={`translate(${textX},${textY}) rotate(${rotate})`}
      >
        {trimLabel(value)}
      </text>
    </g>
  );
};

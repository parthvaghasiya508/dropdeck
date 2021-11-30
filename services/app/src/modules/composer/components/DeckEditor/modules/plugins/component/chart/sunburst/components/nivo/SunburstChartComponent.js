import React from 'react';
import { ResponsiveWrapper } from '@nivo/core';
import { Sunburst } from "@nivo/sunburst";

const upperBound = (value, max) => (value > max ? max : value);

/**
 * Compute margins for a pie chart of the given dimensions.
 */
const calculateMargins = (width, height) => {
  const top = upperBound(Math.ceil(0.1 * height), 50);
  const bottom = upperBound(Math.ceil(0.1 * height), 50);
  const left = upperBound(Math.ceil(0.1 * width), 50);
  const right = upperBound(Math.ceil(0.1 * width), 50);
  return { top, bottom, left, right };
};

/**
 * Pie chart component.
 */
const SunburstChartComponent = ({ data, colors, theme, onReady, backgroundColor, wrapLabels = false }) => (
  <div
    onLoad={onReady}
    style={{
      width: '100%',
      height: '100%'
    }}>
    <ResponsiveWrapper>
      {({ width, height }) => {
        const margins = calculateMargins(width, height);
        return (
          <Sunburst
            isInteractive
            height={height}
            width={width}
            data={data}
            cornerRadius={1}
            borderWidth={2}
            childColor={{
              from: 'color',
              modifiers: [['darker', 0.5]]
            }}
            animate={false}
            motionConfig="gentle"
            colors={colors}
            borderColor={theme.borderColor}
            margin={margins}
            theme={theme}
          />
        );
      }}
    </ResponsiveWrapper>
  </div>

);
export default SunburstChartComponent;

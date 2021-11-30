import { Line } from '@nivo/line';
import React from 'react';
import { ResponsiveWrapper } from "@nivo/core";
import { renderTickTrimmed } from "../../../../utils/renderTickTrimmed";

const upperBound = (value, max) => (value > max ? max : value);

// Minimum size of chart for which we can show category labels.
const LABELS_THRESHOLD = 100;

// Used to calculate size of label points on curve.
const POINT_SIZE_RATIO = 1 / 20;

/**
 * Compute margins for a line chart of the given dimensions.
 */
const calculateMargins = (width, height) => {
  const minDimension = Math.min(width, height);
  const top = upperBound(Math.ceil(0.1 * minDimension), 40);
  const bottom = Math.ceil(0.3 * minDimension);
  const left = Math.ceil(0.2 * minDimension);
  const right = upperBound(Math.ceil(0.1 * minDimension), 50);
  return { top, bottom, left, right };
};

const PointSymbol = (fillColor) => ({ size, color, borderWidth, borderColor }) => (
  <g>
    <circle fill={fillColor} r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
);

const LineChartComponent = ({ data, colors, theme, onReady, wrapLabels = false }) => (
  <div
    onLoad={onReady}
    style={{
      width: '100%',
      height: '100%'
    }}>
    <ResponsiveWrapper>
      {({ width, height }) => {
        const minDimension = Math.min(width, height);
        const showBottomAxis = height > LABELS_THRESHOLD;
        const pointSize = Math.ceil(minDimension * POINT_SIZE_RATIO);
        const pointLabelYOffset = -pointSize + 5;
        const margins = showBottomAxis ? calculateMargins(width, height) : { top: 5, bottom: 5, left: 5, right: 5 };

        return (
          <Line

            // Base
            width={width}
            height={height}
            data={data}
            isInteractive={wrapLabels}
            animate={false}
            theme={theme}

            // Curve
            curve="natural"

            // Area
            enableArea={false}

            // Styling
            colors={colors}
            borderWidth={1}
            margin={margins}
            padding={0.3}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.5]]
            }}

            // Grid
            enableGridY={false}
            enableGridX={false}

            // Axes
            axisLeft={{
              enable: false,
              tickPadding: pointSize + 2,
            }}
            axisBottom={{
              enable: showBottomAxis,
              tickSize: 5,
              tickPadding: 10,
              tickRotation: 45,
              legend: '',
              renderTick: renderTickTrimmed(theme),
            }}

            // Point labels
            enablePointLabel
            pointLabel={(d) => `${d.prefix || ''}${d.y.toLocaleString()}${d.suffix || ''}`}
            pointSymbol={PointSymbol(theme.labels.text.fill)}
            pointSize={pointSize}
            pointBorderWidth={1}
            pointLabelYOffset={pointLabelYOffset}
            pointBorderColor={{
              from: 'color',
              modifiers: [['darker', 0.3]],
            }}
          />
        );
      }}
    </ResponsiveWrapper>
  </div>
);
export default LineChartComponent;

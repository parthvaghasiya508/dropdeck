import { Pie } from '@nivo/pie';
import React from 'react';
import { ResponsiveWrapper } from '@nivo/core';

// Minimum size of chart for which we can show radial labels.
const RADIAL_LABELS_THRESHOLD = 150;

// Minimum size of chart for which we can show slice labels.
const SLICE_LABELS_THRESHOLD = 100;

// Used for approximating relative pixel sizes.
const REFERENCE_WIDTH = 600;

const scale = (value, width) => Math.min(value, Math.ceil(value * width / REFERENCE_WIDTH));

/**
 * Compute margins for a pie chart of the given dimensions.
 */
const calculateMargins = (width, height) => {
  const minDimension = Math.min(width, height);
  const top = Math.ceil(0.25 * minDimension);
  const bottom = Math.ceil(0.25 * minDimension);
  const left = Math.ceil(0.25 * minDimension);
  const right = Math.ceil(0.25 * minDimension);
  return { top, bottom, left, right };
};

/**
 * Pie chart component.
 */
const PieChartComponent = ({ data, colors, theme, onReady }) => (
  <div
    onLoad={onReady}
    style={{
      width: '100%',
      height: '100%'
    }}>
    <ResponsiveWrapper>
      {({ width, height }) => {
        const minDimension = Math.min(width, height);
        const showRadialLabels = minDimension > RADIAL_LABELS_THRESHOLD;
        const showSliceLabels = minDimension > SLICE_LABELS_THRESHOLD;
        const margins = showRadialLabels ? calculateMargins(width, height) : { top: 10, bottom: 10, left: 10, right: 10 };
        const radialLabelsLinkHorizontalLength = scale(20, width);
        const radialLabelsLinkDiagonalLength = scale(40, width);
        const radialLabelsLinkOffset = scale(24, width);
        return (
          <Pie
            isInteractive
            pixelRatio={2}
            borderWidth={1}
            height={height}
            width={width}
            data={data}
            padAngle={1}
            cornerRadius={0}
            colors={colors}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.5]]
            }}
            margin={margins}
            theme={theme}
            innerRadius={0.4}

            // Outer (radial) labels
            enableRadialLabels={showRadialLabels}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={3}
            radialLabelsTextColor={{ theme: 'textColor' }}
            radialLabelsLinkOffset={-radialLabelsLinkOffset}
            radialLabelsLinkDiagonalLength={radialLabelsLinkDiagonalLength}
            radialLabelsLinkHorizontalLength={radialLabelsLinkHorizontalLength}
            radialLabelsLinkStrokeWidth={1}
            radialLabel={(d) => `${d.label}`}
            radialLabelsLinkWidth={1}
            radialLabelsLinkColor={{
              from: 'color',
              modifiers: []
            }}

            // Slice labels
            enableSliceLabels={showSliceLabels}
            sliceLabel={(d) => `${d.data.prefix || ''}${d.value.toLocaleString()}${d.data.suffix || ''}`}
            sliceLabelsSkipAngle={10}

          />
        );
      }}
    </ResponsiveWrapper>
  </div>
);
export default PieChartComponent;

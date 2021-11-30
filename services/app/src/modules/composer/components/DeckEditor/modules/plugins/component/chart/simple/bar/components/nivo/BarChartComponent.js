import { Bar } from '@nivo/bar';
import React from 'react';
import { ResponsiveWrapper } from "@nivo/core";
import { renderTickTrimmed } from "../../../../utils/renderTickTrimmed";

// Minimum size of chart for which we can show category labels.
const LABELS_THRESHOLD = 100;

export const Layout = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

/**
 * Compute margins for a pie chart of the given dimensions.
 */
const calculateMargins = (width, height, layout) => {
  const top = 10;
  const right = 5;
  const minDimension = Math.min(width, height);
  const bottomMarginMultiplier = layout === Layout.VERTICAL ? 0.4 : 0.2;
  const bottom = Math.ceil(bottomMarginMultiplier * minDimension);
  const leftMarginMultiplier = layout === Layout.HORIZONTAL ? 0.4 : 0.2;
  const left = Math.ceil(leftMarginMultiplier * minDimension);
  return { top, bottom, left, right };
};

const BarChartComponent = ({ categories, data, colors, theme, onReady, wrapLabels = false, layout }) => (
  <div
    onLoad={onReady}
    style={{
      width: '100%',
      height: '100%'
    }}>
    <ResponsiveWrapper>
      {({ width, height }) => {
        const showBottomAxis = layout === Layout.VERTICAL && height > LABELS_THRESHOLD;
        const showLeftAxis = layout === Layout.HORIZONTAL && width > LABELS_THRESHOLD;
        const margins = (showBottomAxis || showLeftAxis) ? calculateMargins(width, height, layout) : { top: 5, bottom: 5, left: 5, right: 5 };
        return (
          <Bar

            // Base
            width={width}
            height={height}
            data={data}
            keys={categories}
            indexBy="id"
            valueScale={{ type: 'linear' }}
            indexScale={{
              type: 'band',
              round: true
            }}
            isInteractive={wrapLabels}
            animate={false}
            layout={layout}

            // Styling
            borderWidth={1}
            margin={margins}
            padding={0.3}
            colors={colors}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.7]]
            }}

            // Labels
            label={(d) => `${d.data.prefix || ''}${d.value.toLocaleString()}${d.data.suffix || ''}`}
            labelSkipWidth={15}
            labelSkipHeight={15}
            labelTextColor={{ theme: 'labels.text.fill' }}
            theme={theme}

            // Grid
            enableGridY={false}
            enableGridX={false}

            // Axes and legend
            axisTop={null}
            axisRight={null}
            axisBottom={{
              enable: showBottomAxis,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 45,
              legend: '',
              theme,
              renderTick: showBottomAxis ? renderTickTrimmed(theme) : undefined,
            }}
            axisLeft={{
              enable: showLeftAxis,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              theme,
              renderTick: showLeftAxis ? renderTickTrimmed(theme) : undefined,
            }}

            // axisLeft={{
            //   tickSize: 10,
            //   tickPadding: 0,
            //   tickRotation: 0,
            //   legend: '',
            //   // legendPosition: 'middle',
            //   legendOffset: -40
            // }}

            // legends={[
            //   {
            //     dataFrom: 'keys',
            //     anchor: 'bottom-right',
            //     direction: 'column',
            //     justify: false,
            //     translateX: 120,
            //     translateY: 0,
            //     itemsSpacing: 2,
            //     itemWidth: 100,
            //     itemHeight: 20,
            //     itemDirection: 'left-to-right',
            //     itemOpacity: 0.85,
            //     symbolSize: 20,
            //     effects: [
            //       {
            //         on: 'hover',
            //         style: {
            //           itemOpacity: 1
            //         }
            //       }
            //     ]
            //   }
            // ]}
            // motionStiffness={90}
            // motionDamping={15}
          />
        );
      }}
    </ResponsiveWrapper>
  </div>
);
export default BarChartComponent;

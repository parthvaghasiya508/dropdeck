// Question: Ask for a keyword and perform an image search

import React from "react";

export const PARAMETER_CHART_TYPE = 'chartType';

export const promptForChartType = () => ({
  name: PARAMETER_CHART_TYPE,
  label: 'What type of chart?',
  placeholder: 'E.g. pie, bar, column.',

  // renderPromptElement: (node, path, onSubmit) => (
  //   <ChartType onSelect={(type) => onSubmit(type)} node={node} path={path} />
  // ),
});

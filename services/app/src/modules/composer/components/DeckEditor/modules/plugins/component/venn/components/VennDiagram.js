import React, { useEffect } from "react";
import d3 from 'd3';
import { VennDiagram as Venn } from "venn.js";
import './VennDiagram.scss';
import useDimensions from "react-cool-dimensions";

const VennDiagram = ({ data }) => {

  const { ref, width, height } = useDimensions();

  const drawChart = (data) => {
    const chart = Venn()
      .width(width)
      .height(height);
    d3.select("#venn")
      .classed("svg-content", true)
      .datum(data)
      .call(chart);
  };

  useEffect(() => {
    drawChart(data);
  }, [data, width, height]);

  // TODO get the unique path ID
  return (<div id="venn" ref={ref} data-width={width} data-height={height} className="svg-container"/>);
};
export default VennDiagram;

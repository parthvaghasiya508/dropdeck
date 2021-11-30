import React from "react";
import { nodeToSeries } from "../transforms/nodeToSeries";
import VennDiagram from "./VennDiagram";
import { overlap } from "../transforms/overlap";
import SlideComponent from "../../../../../../../../../common/slide/SlideComponent";
import { CHART } from "../../chart/type";

export class VennDiagramSlideComponent extends SlideComponent {
  constructor({ node }) {
    super();
    super.setMarkupType(CHART);
    const sets = nodeToSeries(node.children);
    const data = [...sets, ...overlap(sets)];
    this.setComponent(<VennDiagram data={data} />);
  }
}

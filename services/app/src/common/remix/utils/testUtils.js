import { applyClustering, applySequencing } from "../../slide/transforms/clustering/clustering";

export const toSlideRelativeTo = (remix, ...nodes) => {
  const mapped = nodes.map((type) => ({ type }));
  if (remix !== null && remix.transform) {
    return remix.transform(mapped);
  }
  if (remix !== null && !remix.clustering) {
    return applySequencing(mapped);
  }
  return applyClustering(mapped);
};

export const toSlide = (...nodes) => toSlideRelativeTo(null, ...nodes);

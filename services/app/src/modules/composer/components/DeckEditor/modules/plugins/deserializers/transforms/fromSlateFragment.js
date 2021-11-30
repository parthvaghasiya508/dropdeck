import { newSlide } from "../../slide/transforms/newSlide";
import { SLIDE } from "../../component/slide/type";

export const fromSlateFragment = (nodes) => {
  const slides = [];
  nodes.forEach((node) => {
    if (node.type === SLIDE) {
      const { children, settings } = node;
      slides.push(newSlide(children, settings));
    }
  });
  return slides;
};

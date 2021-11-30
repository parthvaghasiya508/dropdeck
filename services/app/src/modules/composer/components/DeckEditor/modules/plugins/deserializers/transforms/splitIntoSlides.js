import { newSlide } from "../../slide/transforms/newSlide";
import { isHeading } from "./isHeading";
import { summarise } from "./summarise";
import { ensureNotEmpty } from "./ensureNotEmpty";
import { SLIDE } from "../../component/slide/type";
import { HEADING_ONE } from "../../component/heading/one/type";
import { HEADING_TWO } from "../../component/heading/two/type";

export const splitIntoSlides = (fragment, splitContent) => {
  if (!fragment) {
    return fragment;
  }

  const slides = [];
  let buffer = [];
  let previousNode;
  let prevNodeLevel = 0;
  fragment.forEach((node) => {
    if (node.type === SLIDE) {
      slides.push(node);
    } else {
      if (shouldSplit(node, buffer, splitContent, prevNodeLevel)) {
        slides.push(newSlide(summarise(ensureNotEmpty(buffer))));
        buffer = [];
      }

      prevNodeLevel = headingLevel(node);
      previousNode = node;
      buffer.push(node);
    }
  });

  // Boundary case.
  if (buffer.length > 0) {
    slides.push(newSlide(summarise(ensureNotEmpty(buffer))));
  }

  return slides;
};

const shouldSplit = (node, buffer, splitContent, prevNodeLevel) => (
  (splitContent && isHeading(node) && buffer.length > 0 && headingLevel(node) >= prevNodeLevel));

const headingLevel = (node) => {
  switch (node.type) {
    case HEADING_ONE: return 2;
    case HEADING_TWO: return 1;
    default: return 0;
  }
};

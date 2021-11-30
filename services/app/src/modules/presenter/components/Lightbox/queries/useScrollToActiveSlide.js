import computeScrollIntoView from "compute-scroll-into-view";
import { ACTIVE_SLIDE_CLASS, HOVERING_SLIDE_CLASS } from "../Lightbox";

export const useScrollToActiveSlide = (activeSlide, scrolledSlide, setScrolledSlide) => () => {
  if (activeSlide !== scrolledSlide) {
    // Select the active slide but only when the remix panel is not active (not(.hovering)).
    const hoveringSlideElement = document.querySelector(`.${HOVERING_SLIDE_CLASS}`);
    if (hoveringSlideElement === null) {
      const activeSlideElement = document.querySelector(`.${ACTIVE_SLIDE_CLASS}`);
      if (activeSlideElement) {
        const actions = computeScrollIntoView(activeSlideElement, {
          scrollMode: "if-needed",
          block: 'start',
        });
        actions.forEach(({ el, top, left }) => {
          el.scrollTo({ top, behavior: 'smooth' });
        });
        setScrolledSlide(activeSlide);
      }
    }
  }
};

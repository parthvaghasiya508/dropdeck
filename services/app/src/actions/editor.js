export const ACTION_SET_ACTIVE_SLIDE = 'SET_ACTIVE_SLIDE';

/**
 * Action to mark the current active slide.
 *
 * @param slideId
 */
export function setActiveSlide(slideId) {
  return {
    type: ACTION_SET_ACTIVE_SLIDE,
    slideId
  };
}

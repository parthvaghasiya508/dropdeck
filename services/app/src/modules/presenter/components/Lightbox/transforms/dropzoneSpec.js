import {
  ACCEPTED_IMAGE_TYPES,
  IMAGE_MAX_SIZE
} from "../../../../composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageDropZone";
import { SLIDE_ID_PREFIX, SLIDE_VIEW_CLASS } from "../components/SortableItem/SortableItem";
import { LIGHTBOX_CONTAINER_ID } from "../Lightbox";
import { TUTORIAL_SLIDE_CLASS } from "../components/TutorialHelper";

/**
 * Specification of drop zone properties in the Lightbox.
 *
 * @param setDropZoneIndex
 * @param setDropZonePosition
 * @param setDropZoneInLightBox
 * @param getColumnCount
 * @param dropZoneIndex
 * @param slides
 * @returns {{onDrop: onDrop, maxSize, onDragOver: onDragOver, onDragLeave: onDragLeave, onDragEnter: onDragEnter, accept: string}}
 */
export const dropzoneSpec = (
  setDropZoneIndex,
  setDropZonePosition,
  setDropZoneInLightBox,
  setDroppedInside,
  getColumnCount,
  dropZoneIndex,
  slides,
  hideRemixPanels,
) => ({
  maxSize: IMAGE_MAX_SIZE,
  onDrop: () => {
    // setDropZoneIndex(-1);
    // setDropZonePosition(-1);
    // setDropZoneInLightBox(false);
  },
  onDragEnter: (event) => {
    hideRemixPanels(null, event);
    setDroppedInside(false);
    if (event.target.classList.contains(SLIDE_VIEW_CLASS)) {
      setDropZoneInLightBox(false);
      setDropZoneIndex(-1);
      setDropZonePosition(-1);
      const slideId = event.target.id.replace(SLIDE_ID_PREFIX, '');
      const slideIndex = slides.findIndex((slide) => slide.id === slideId);
      const computedStyle = window.getComputedStyle(event.target);
      const slidePaddingLeft = parseFloat(computedStyle.getPropertyValue('padding-left').replace('px', ''));
      const slidePaddingRight = parseFloat(computedStyle.getPropertyValue('padding-right').replace('px', ''));
      const slidePaddingBottom = parseFloat(computedStyle.getPropertyValue('padding-bottom').replace('px', ''));
      const { scrollTop } = document.getElementById(LIGHTBOX_CONTAINER_ID);

      if (getColumnCount === 1) {
        if ((event.target.offsetTop - 40 <= event.clientY + scrollTop) && (event.target.offsetTop + 60 >= event.clientY + scrollTop)) {
          setDropZoneIndex(slideIndex);
        } else if ((event.target.offsetTop + event.target.clientHeight - slidePaddingBottom - 40 <= event.clientY + scrollTop) && (event.target.offsetTop + event.target.clientHeight - slidePaddingBottom + 60 >= event.clientY + scrollTop)) {
          setDropZoneIndex(slideIndex + 1);
        }
      } else if (getColumnCount >= 2) {
        if (event.target.offsetLeft - slidePaddingLeft <= event.clientX && event.target.offsetLeft - slidePaddingLeft + 20 >= event.clientX) {
          setDropZoneIndex(slideIndex);
          setDropZonePosition(parseInt(slideIndex / getColumnCount, 10) * (getColumnCount + 1) + slideIndex % getColumnCount);
        } else if (event.target.offsetLeft - slidePaddingLeft + event.target.clientWidth - slidePaddingRight <= event.clientX && event.target.offsetLeft - slidePaddingLeft + event.target.clientWidth - slidePaddingRight + 20 >= event.clientX) {
          setDropZoneIndex(slideIndex + 1);
          setDropZonePosition(parseInt(slideIndex / getColumnCount, 10) * (getColumnCount + 1) + slideIndex % getColumnCount + 1);
        }
      }
    }

    const lightboxContainer = document.getElementById(LIGHTBOX_CONTAINER_ID);
    if (event.target.id === LIGHTBOX_CONTAINER_ID || event.target === lightboxContainer.children[0] || (event.target === lightboxContainer.children[0].children[0] && dropZoneIndex === -1) || event.target.classList.contains(TUTORIAL_SLIDE_CLASS) || event.target.closest(`.${TUTORIAL_SLIDE_CLASS}`)) {
      setDropZoneIndex(slides.length);
      setDropZonePosition(parseInt(slides.length / getColumnCount, 10) * (getColumnCount + 1) + slides.length % getColumnCount);
      setDropZoneInLightBox(true);
    }
  },

  onDragOver: (event) => {
    event.preventDefault();
    const currentSlide = event.target.closest(`.${SLIDE_VIEW_CLASS}`);
    if (currentSlide && currentSlide.getBoundingClientRect()) {
      setDropZoneInLightBox(false);
      const rect = currentSlide.getBoundingClientRect();
      const slideId = currentSlide.id.replace(SLIDE_ID_PREFIX, '');
      const slideIndex = slides.findIndex((slide) => slide.id === slideId);
      if (getColumnCount === 1) {
        if (rect.y <= event.clientY && event.clientY <= rect.y + 40) {
          setDropZoneIndex(slideIndex);
        } else if (rect.y + rect.height - 40 <= event.clientY && event.clientY <= rect.y + rect.height) {
          setDropZoneIndex(slideIndex + 1);
        } else {
          setDropZoneIndex(-1);
        }
      } else if (getColumnCount >= 2) {
        if (rect.x <= event.clientX && event.clientX <= rect.x + 40) {
          setDropZoneIndex(slideIndex);
          setDropZonePosition(parseInt(slideIndex / getColumnCount, 10) * (getColumnCount + 1) + slideIndex % getColumnCount);
        } else if (rect.x + rect.width - 40 <= event.clientX && event.clientX <= rect.x + rect.width) {
          setDropZoneIndex(slideIndex + 1);
          setDropZonePosition(parseInt(slideIndex / getColumnCount, 10) * (getColumnCount + 1) + slideIndex % getColumnCount + 1);
        } else {
          setDropZoneIndex(-1);
        }
      } else {
        setDropZoneIndex(-1);
      }
    }
  },
  onDragLeave: () => {
    setDropZoneIndex(-1);
    setDropZoneInLightBox(false);
  },
  accept: ACCEPTED_IMAGE_TYPES
});

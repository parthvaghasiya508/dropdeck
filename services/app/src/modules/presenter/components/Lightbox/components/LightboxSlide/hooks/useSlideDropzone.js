import { useDropzone } from "react-dropzone";
import {
  ACCEPTED_IMAGE_TYPES,
  IMAGE_MAX_SIZE
} from "../../../../../../composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageDropZone";
import { onDropImage } from "../transforms/onDropImage";
import { IMAGE_DROP_TARGET } from "../../../../../../composer/components/DeckEditor/modules/plugins/component/media/components/ImageComponent/ImageComponent";

export const useSlideDropzone = ({
  slide,
  setSlideOverlay,
  onImageDrop,
  addImageToSlide,
  hoverPath,
  removeHoverFromImages,
  setAddImageToSlide,
}) => useDropzone({
  maxSize: IMAGE_MAX_SIZE,
  onDrop: (acceptedFiles, rejectedFiles) => {
    onDropImage(slide, setSlideOverlay, onImageDrop, acceptedFiles, rejectedFiles, addImageToSlide, hoverPath);
    removeHoverFromImages();
  },
  onDragEnter: (event) => {
    removeHoverFromImages();
    if (event.target.classList.contains(IMAGE_DROP_TARGET)) {
      event.target.classList.add('hover');
      setAddImageToSlide(false);
      setSlideOverlay(false);
    } else {
      setAddImageToSlide(true);
      setSlideOverlay(true);
    }
  },
  onDragLeave: () => {
    removeHoverFromImages();
    setSlideOverlay(false);
  },
  accept: ACCEPTED_IMAGE_TYPES,
});

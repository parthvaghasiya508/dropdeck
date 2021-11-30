import { logger } from "../../../../../../../common/util/logger";

const MAX_FILES = 12;

export const onDropImage = async (slide, setSlideOverlay, onImageDrop, acceptedFiles, rejectedFiles, addImageToSlide, path) => {
  setSlideOverlay(false);

  if (rejectedFiles.length > 0) {
    logger.warn(`Error when uploading files: invalid file types`);
    return;
  }
  if (acceptedFiles.length > MAX_FILES) {
    logger.warn(`Error when uploading files: too many files`);
    return;
  }

  if (acceptedFiles.length > 0) {
    onImageDrop(slide, acceptedFiles, addImageToSlide, path);
  }
};

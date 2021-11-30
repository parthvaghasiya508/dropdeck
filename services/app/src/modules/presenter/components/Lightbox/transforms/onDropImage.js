import { logger } from "../../../../../common/util/logger";

const MAX_FILES = 12;

export const onDropImage = async (selectedValue, slide, isuploadImage, onWidgetDrop, acceptedFiles, rejectedFiles, setDropZoneIndex, setDropZonePosition, setDroppedInside) => {
  if (!isuploadImage) {
    return null;
  }
  if (rejectedFiles.length > 0) {
    logger.warn(`Error when uploading files: invalid file types`);
  }
  if (acceptedFiles.length > MAX_FILES) {
    logger.warn(`Error when uploading files: too many files`);
    return;
  }

  if (acceptedFiles.length > 0) {
    onWidgetDrop(selectedValue, slide, acceptedFiles, setDropZoneIndex, setDropZonePosition, setDroppedInside);
  }
};

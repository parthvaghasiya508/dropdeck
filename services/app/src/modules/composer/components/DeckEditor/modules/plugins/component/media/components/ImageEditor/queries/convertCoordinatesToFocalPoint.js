import MathUtils from "../../../../../../../../../../../common/util/MathUtils";

export const convertCoordinatesToFocalPoint = (coordinates, containerSize, scaledImageSize) => {
  const fpX = 0.5 - coordinates.x / Math.max(1, scaledImageSize.w - containerSize.w);
  const fpY = 0.5 - coordinates.y / Math.max(1, scaledImageSize.h - containerSize.h);
  // return { x: fpX, y: fpY };
  return { x: MathUtils.minMax(fpX, 0, 1), y: MathUtils.minMax(fpY, 0, 1) };
};

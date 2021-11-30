export const convertFocalPointToCoordinates = (focalPoint, containerSize, scaledImageSize) => {
  const fpX = focalPoint.x;
  const fpY = focalPoint.y;
  const x = (0.5 - fpX) * Math.max(1, scaledImageSize.w - containerSize.w);
  const y = (0.5 - fpY) * Math.max(1, scaledImageSize.h - containerSize.h);
  return { x, y };
};

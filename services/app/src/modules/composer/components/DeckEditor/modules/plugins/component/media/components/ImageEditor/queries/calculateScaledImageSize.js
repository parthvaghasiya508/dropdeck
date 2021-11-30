export const calculateScaledImageSize = (intrinsicSize, containerSize) => {
  const widthScaling = containerSize.w / Math.max(1, intrinsicSize.w);
  const heightScaling = containerSize.h / Math.max(1, intrinsicSize.h);

  // The image is down-scaled:
  if (widthScaling < 1 || heightScaling < 1) {
    const downScaling = Math.max(widthScaling, heightScaling);
    return { w: Math.round(downScaling * intrinsicSize.w), h: Math.round(downScaling * intrinsicSize.h) };
  }
  if (widthScaling > 1 || heightScaling > 1) {
    const upScaling = Math.max(widthScaling, heightScaling);
    return { w: Math.round(upScaling * intrinsicSize.w), h: Math.round(upScaling * intrinsicSize.h) };
  }
  return intrinsicSize;
};

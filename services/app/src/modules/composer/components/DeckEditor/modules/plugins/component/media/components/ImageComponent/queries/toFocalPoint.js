export const toFocalPoint = ({ x, y }) => {
  if (x !== undefined && y !== undefined) {
    const fpX = 0.5 - x;
    const fpY = 0.5 - y;
    return {
      x: Math.min(1, Math.max(0, fpX)),
      y: Math.min(1, Math.max(0, fpY)),
    };
  }
  return {};
};

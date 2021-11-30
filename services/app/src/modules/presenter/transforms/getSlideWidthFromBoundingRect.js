export const getSlideWidthFromBoundingRect = (setSlideWidth) => (element) => {
  if (element) {
    const w = element.getBoundingClientRect().width;
    setSlideWidth(Math.round(w / 10) * 10);
  }
};

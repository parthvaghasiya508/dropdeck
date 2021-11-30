export const haveSlidesChanged = (newSlides, oldSlides) => {
  if ((!oldSlides && newSlides) || (oldSlides && !newSlides)) {
    return true;
  }
  if (!Array.isArray(oldSlides) || !Array.isArray(newSlides) || newSlides.length !== oldSlides.length) {
    return true;
  }

  // assert: newSlides.length === oldSlides.length

  for (let i = 0; i < oldSlides.length; i++) {
    const oldSlide = oldSlides[i];
    const newSlide = newSlides[i];
    if (oldSlide.id !== newSlide.id || oldSlide.timeStamp !== newSlide.timeStamp) {
      return true;
    }
  }
  return false;
};

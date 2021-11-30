/**
 * Return the time of the last modification to an array of slides.
 *
 * @param slides
 */
export const slidesLastModified = (slides = []) => {
  let maxTimeStamp = 0;
  slides.forEach((slide) => {
    const { timeStamp } = slide;
    if (timeStamp > maxTimeStamp) {
      maxTimeStamp = timeStamp;
    }
  });
  return maxTimeStamp;
};

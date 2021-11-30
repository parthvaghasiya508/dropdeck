import { RemixEngine } from "../../remix/RemixEngine";

/**
 * Choose a remix for the given slide. If the slide settings store a remix, we check if that is still a valid remix
 * option. If it is, we return that; otherwise we return the top matching remix option.
 *
 * @param slide
 */
export const chooseRemix = (slide) => {
  if (!slide) {
    return null;
  }
  const { remix } = slide;
  if (remix === null) {
    return null; // this means "no remix applied"
  }
  if (remix !== undefined && remix !== null) {

    for (let i = 0; i < slide.matchingRemixes.length; i++) {
      if (slide.matchingRemixes[i].name === remix) {
        return remix;
      }
    }

    // If the remix that has been stored for a slide is not matching anymore,
    // we check if that's because it's been deprecated (in that case we return
    // that remix, to not break backwards compatibility).
    const backwardsCompatibleRemix = RemixEngine.instance.get(remix);
    if (backwardsCompatibleRemix !== null && backwardsCompatibleRemix !== undefined && backwardsCompatibleRemix.deprecated) {
      return remix;
    }
  }
  return slide.matchingRemixes.length > 0 ? slide.matchingRemixes[0].name : null;
};

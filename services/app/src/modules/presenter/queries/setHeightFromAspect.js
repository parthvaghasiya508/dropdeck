import { ASPECT_RATIOS, DEFAULT_ASPECT_RATIO } from "../../../common/model/Deck";

export const setHeightFromAspect = (width, aspect = DEFAULT_ASPECT_RATIO) => {
  const aspectRatio = ASPECT_RATIOS[aspect || DEFAULT_ASPECT_RATIO];
  return width > 0 && aspectRatio ? Math.round(width / aspectRatio) : "100%";
};

import { ASPECT_RATIOS, DEFAULT_ASPECT_RATIO } from "../../../../../common/model/Deck";

export const ASPECT_RATIO = ASPECT_RATIOS[DEFAULT_ASPECT_RATIO];

export const fixedAspectHeight = (width, aspect = DEFAULT_ASPECT_RATIO) => Math.round(width * (1 / (ASPECT_RATIOS[aspect] || ASPECT_RATIOS[DEFAULT_ASPECT_RATIO])));
export const fixedAspectWidth = (height, aspect = DEFAULT_ASPECT_RATIO) => Math.round(height * (1 * (ASPECT_RATIOS[aspect] || ASPECT_RATIOS[DEFAULT_ASPECT_RATIO])));

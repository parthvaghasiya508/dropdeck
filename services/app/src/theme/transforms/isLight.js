import { colorSpec } from "./colorSpec";

const LIGHTNESS_THRESHOLD = 75;

export const isLight = (color) => colorSpec(color).brightness > LIGHTNESS_THRESHOLD;

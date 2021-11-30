import { colorSpec } from "./colorSpec";

const DARKNESS_THRESHOLD = 10;

export const isDark = (color) => colorSpec(color).brightness < DARKNESS_THRESHOLD;

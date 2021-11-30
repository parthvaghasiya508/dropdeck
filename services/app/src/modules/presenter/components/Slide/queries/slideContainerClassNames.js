import { slideIdentifierClassName } from "./slideIdentifierClassName";

export const slideContainerClassNames = (slide, theme, remixName) => `slide ${remixName || ""} ${slideIdentifierClassName(slide)}`;

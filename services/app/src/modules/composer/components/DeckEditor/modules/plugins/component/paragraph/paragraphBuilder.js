import { PARAGRAPH } from "./type";

export const paragraphBuilder = (text = '') => ({
  type: PARAGRAPH,
  children: [{ text }],
});

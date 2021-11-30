import { LINK } from "./type";

export const linkBuilder = (url, text = '') => ({
  type: LINK,
  url,
  children: [{ text }],
});
